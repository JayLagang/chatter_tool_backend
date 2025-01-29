const {prisma} = require('../config/database');

class Category {
    
    async getAllVaginaColors() {
        return await prisma.vaginaColor.findMany();
    }
    
    async getAllSkinTones() {
        return await prisma.skinTone.findMany();
    }

    async getAllEthnicities() {
        return await prisma.ethnicity.findMany();
    }

    async getAllSocialPlatforms() {
        return await prisma.socialAccountType.findMany();
    }

    async getAllPictureFramings() {
        return await prisma.pictureFraming.findMany();
    }

    async getAllBodyParts() {
        return await prisma.bodyPart.findMany();
    }

    async getAllSocialPlatforms() {
        return await prisma.socialAccountType.findMany();
    }

    async getAllCitizenships() {
        return await prisma.citizenship.findMany();
    }

    async getAllEnglishProficiencyLevels() {
        return await prisma.englishProficiencyLevel.findMany();
    }
}

module.exports = new Category();