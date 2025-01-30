const {prisma} = require('../config/database');

class Model {

    static async createModel(data) {
        const {userName, firstName, lastName, childCount, age, physicalAttributes} = data;

        const result = await prisma.model.create({
            data: {
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                childCount: childCount,
                age: age,
                physicalAttributes: {
                    create: {
                        height: physicalAttributes?.height,
                        weight: physicalAttributes?.weight,
                        bust: physicalAttributes?.bust,
                        waist: physicalAttributes?.waist,
                        skinToneName: physicalAttributes?.skinToneName,
                        ethnicityName: physicalAttributes?.ethnicityName
                    }
                }
            }
        });

        if(!result) {
            return null;
        }

        return result;

    }

    static async getModelByUserName(userName) {
        const result = await prisma.model.findFirst({
            where: {
                userName: userName
            }
        });

        if(!result) {
            return null;
        }

        return result;
    }

    static async getModel(data) {
        const {userName} = data;
        const result = await prisma.model.findFirst({
            where: {
                userName: userName
            },
            include: {
                platforms: true,
                samplePictures: true,
                physicalAttributes: true
            }
        });

        if(!result) {
            return null;
        }

        return result;

    }

    static async getAllModels() {
        const result = await prisma.model.findMany({
            include: {
                platforms: true,
                samplePictures: true,
                physicalAttributes: true
            }
        });

        if(!result) {
            return null;
        }

        return result;
    }

    static async updateAttributes(data) {
        const {userName, physicalAttributes} = data;
        const {height, weight, bust, waist, skinToneName,ethnicityName} = physicalAttributes;
        const result = await prisma.model.update({
            where: {
                userName: userName
            },
            data: {
                physicalAttributes: {
                    update: {
                        height: height,
                        weight: weight,
                        bust: bust,
                        waist: waist,
                        skinToneName: skinToneName,
                        ethnicityName: ethnicityName
                    }
                }
            }
        });

        if(!result) {
            return null;
        }

        return result;
    }

    static async addSocialPlatform(data) {
        const {modelId, platform} = data;
        const {platformName,link, userName} = platform;
        const result = await prisma.model.update({
            where: {
                modelId: modelId
            },
            data: {
                platforms: {
                    create: {
                        platformName: platformName,
                        link: link,
                        userName: userName
                    }
                }
            }
        });

        if(!result) {
            return null;
        }

        return result;
    }

    static async updateSocialPlatform(data) {
        const {modelId, platform} = data;
        const {id,platformName,link, userName} = platform;
        const result = await prisma.model.update({
            where: {
                modelId: modelId
            },
            data: {
                platforms: {
                    update: {
                        where: {
                            id: id
                        },
                        data: {
                            platformName: platformName,
                            link: link,
                            userName: userName
                        }
                    }
                }
            }
        });

        if(!result) {
            return null;
        }

        return result;
    }
    
    static async uploadModelSamplePicture(data) {
        const {modelId, vaginaColorName, bodyPartName,pictureFramingName, url, consolidatedDescription} = data;

        const result = await prisma.model.update({
            where: {
                modelId: modelId
            },
            data: {
                samplePictures: {
                    create: {
                        vaginaColorName: vaginaColorName,
                        bodyPartName: bodyPartName,
                        pictureFramingName: pictureFramingName,
                        url: url,
                        consolidatedDescription: consolidatedDescription
                    }
                }
            }
        });

        if(!result) {
            return null;
        }

        return result;
    }
}

module.exports = Model;