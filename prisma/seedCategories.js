const fs = require('fs').promises;
const path = require('path');
const {prisma} = require('../config/database');

async function main(){
    const bodyPartsData = await fs.readFile(path.join(__dirname, './data/body_part.json'), 'utf-8');
    const bodyParts = JSON.parse(bodyPartsData);
    try{
        
        console.log('Seeding body parts...');
        await seedBodyParts(prisma, bodyParts, true);

    } catch (error) {
        console.error('Error seeding data:', error);
		process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}
async function seedBodyParts(prisma, bodyParts, deleteAll) {
    
    if (deleteAll===true) {
        await prisma.bodyPart.deleteMany();
    }
    for (const part of bodyParts) {
        const newBodyPart = await prisma.bodyPart.create({
            data: {
                name: part.name
            }
        });
        if(newBodyPart) {
            console.log(`Body part ${part.name} seeded successfully`);
        } else {
            console.error(`Failed to seed body part ${part.name}`);
        }

    }

    console.log('Body parts seeded successfully');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});