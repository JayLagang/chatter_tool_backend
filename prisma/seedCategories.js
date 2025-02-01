const fs = require('fs').promises;
const path = require('path');
const {prisma} = require('../config/database');

async function main(){
   
    try{

        const bodyPartsData = await fs.readFile(path.join(__dirname, './data/body_part.json'), 'utf-8');
        const bodyParts = JSON.parse(bodyPartsData);
        const pictureFramingData = await fs.readFile(path.join(__dirname, './data/picture_framing.json'), 'utf-8');
        const pictureFraming = JSON.parse(pictureFramingData);
        const socialPlatformsData = await fs.readFile(path.join(__dirname, './data/social_platform.json'), 'utf-8');
        const socialPlatforms = JSON.parse(socialPlatformsData);
        const vaginaColorsData = await fs.readFile(path.join(__dirname, './data/vagina_color.json'), 'utf-8');
        const vaginaColors = JSON.parse(vaginaColorsData)
        const skinToneData = await fs.readFile(path.join(__dirname, './data/skin_tone.json'), 'utf-8');
        const skinTone = JSON.parse(skinToneData)
        const citizenshipData = await fs.readFile(path.join(__dirname, './data/citizenship.json'), 'utf-8');
        const citizenship = JSON.parse(citizenshipData)
        const englishProficiencyLevelData = await fs.readFile(path.join(__dirname, './data/english_proficiency_level.json'), 'utf-8');
        const englishProficiency = JSON.parse(englishProficiencyLevelData)
        const ethnicitieData = await fs.readFile(path.join(__dirname, './data/ethnicity.json'), 'utf-8')
        const ethnicity = JSON.parse(ethnicitieData)

        console.log('Seeding body parts...');
        await seedBodyParts(prisma, bodyParts, true);

        console.log('Seeding pictureFraming...');
        await seedPictureFraming(prisma,pictureFraming, true )

        console.log('Seeding Social Platforms...')
        await seedSocialPlatforms(prisma,socialPlatforms, true)

        console.log('Seeding Ethinicities...')
        await seedEthnicities(prisma, ethnicity, true)

        console.log('Seeding vgna colors')
        await seedVaginaColors(prisma,vaginaColors, true)

        console.log('Seeding Skin Tones')
        await seedSkinTones(prisma,skinTone,true)

        console.log('Seeding Citizenship')
        await seedCitizenship(prisma,citizenship,true)

        console.log('Seeding English Proficiency Levels')
        await seedEnglishProficiency(prisma,englishProficiency,true)

    } catch (error) {
        console.error('Error seeding data:', error);
		process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

async function seedBodyParts(prisma, bodyParts, deleteAll) {
    // Ensure the model name matches the one in your Prisma schema
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

async function seedPictureFraming(prisma, pictureFraming, deleteAll) {
    // Ensure the model name matches the one in your Prisma schema
    if (deleteAll===true) {
        await prisma.pictureFraming.deleteMany();
    }
    for (const frame of pictureFraming) {
        const newFrame = await prisma.pictureFraming.create({
            data: {
                name: frame.name
            }
        });
        if(newFrame) {
            console.log(`Picture framing ${frame.name} seeded successfully`);
        } else {
            console.error(`Failed to seed picture framing ${frame.name}`);
        }

    }

    console.log('Picture framing seeded successfully');
}

async function seedSocialPlatforms(prisma, socialPlatforms, deleteAll) {
    // Ensure the model name matches the one in your Prisma schema
    if (deleteAll===true) {
        await prisma.socialAccountType.deleteMany();
    }
    for (const platform of socialPlatforms) {
        const newPlatform = await prisma.socialAccountType.create({
            data: {
                name: platform.name
            }
        });
        if(newPlatform) {
            console.log(`Social platform ${platform.name} seeded successfully`);
        } else {
            console.error(`Failed to seed social platform ${platform.name}`);
        }

    }

    console.log('Social platforms seeded successfully');
}

async function seedEthnicities(prisma, ethnicities, deleteAll) {
    // Ensure the model name matches the one in your Prisma schema
    if (deleteAll===true) {
        await prisma.ethnicity.deleteMany();
    }

    for (const ethnicity of ethnicities) {
        const newEthnicity = await prisma.ethnicity.create({
            data: {
                name: ethnicity.name
            }
        });
        if(newEthnicity) {
            console.log(`Ethnicity ${ethnicity.name} seeded successfully`);
        } else {
            console.error(`Failed seeding ${ethnicity.name}`);
        }

    }

    console.log('Ethnicities seeded successfully');
}

async function seedSkinTones(prisma, skinTones, deleteAll) {
    // Ensure the model name matches the one in your Prisma schema
    if (deleteAll===true) {
        await prisma.skinTone.deleteMany();
    }
    for (const tone of skinTones) {
        const newTone = await prisma.skinTone.create({
            data: {
                name: tone.name
            }
        });
        if(newTone) {
            console.log(`Skin tone ${tone.name} seeded successfully`);
        } else {
            console.error(`Failed seeding skin tone ${tone.name}`);
        }

    }

    console.log('Skin tones seeded successfully');

}
async function seedVaginaColors(prisma, vaginaColors, deleteAll) {
    // Ensure the model name matches the one in your Prisma schema
    if (deleteAll===true) {
        await prisma.vaginaColor.deleteMany();
    }
    for (const color of vaginaColors) {
        const newColor = await prisma.vaginaColor.create({
            data: {
                name: color.name
            }
        });
        if(newColor) {
            console.log(`Vgna color ${color.name} seeded successfully`);
        } else {
            console.error(`Failed seeding vinga color ${color.name}`);
        }

    }

    console.log('vgna colors seeded successfully');

}
async function seedCitizenship(prisma, citizenship, deleteAll) {
    // Ensure the model name matches the one in your Prisma schema
    if (deleteAll===true) {
        await prisma.citizenship.deleteMany();
    }
    for (const country of citizenship) {
        const newCountry = await prisma.citizenship.create({
            data: {
                name: country.name
            }
        });
        if(newCountry) {
            console.log(`Citizenship ${country.name} seeded successfully`);
        } else {
            console.error(`Failed seeding citizenship ${country.name}`);
        }

    }

    console.log('Citizenship seeded successfully');
}

async function seedEnglishProficiency(prisma, englishProficiency, deleteAll) {
    // Ensure the model name matches the one in your Prisma schema
    if (deleteAll===true) {
        await prisma.englishProficiencyLevel.deleteMany();
    }
    for (const level of englishProficiency) {
        const newLevel = await prisma.englishProficiencyLevel.create({
            data: {
                name: level.name
            }
        });
        if(newLevel) {
            console.log(`English proficiency level ${level.name} seeded successfully`);
        } else {
            console.error(`Failed seeding English proficiency level ${level.name}`);
        }

    }

    console.log('English proficiency levels seeded successfully');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});