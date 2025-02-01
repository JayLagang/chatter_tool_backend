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
        const result = await prisma.model.findUnique({
            where: {
                userName: userName
            },
            include: {
                platforms: true,
                samplePictures: true,
                physicalAttributes: true
            }
        });
        // console.log(result);
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
    static async updateBasicDetails(data) {
        const {userName, firstName, lastName, childCount, age} = data;
        const result = await prisma.model.update({
            where: {
                userName: userName
            },
            data: {
                firstName: firstName,
                lastName: lastName,
                childCount: childCount || undefined,
                age: age || undefined
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
        const {socialAccountName,link, username,modelId} = data;
        const result = await prisma.model.update({
            where: {
                id: modelId
            },
            data: {
                platforms: {
                    create: {
                        socialAccountName: socialAccountName,
                        link: link,
                        username: username
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
        const {id,socialAccountName,link, username} = data;

        const result = await prisma.modelSocialAccount.update({
            where: {
                id: id
            },
            data: {
                socialAccountName: socialAccountName,
                link: link,
                username: username
            }
        });

        if(!result) {
            return null;
        }

        return result;
    }
    
    static async uploadModelSamplePicture(data) {
        
        const {modelId, vaginaColorName, bodyPartName,pictureFramingName,uploadFileResult, consolidatedDescription} = data;

        const result = await prisma.model.update({
            where: {
                id: modelId
            },
            data: {
                samplePictures: {
                    create: {
                        vaginaColorName: vaginaColorName,
                        bodyPartName: bodyPartName,
                        pictureFramingName: pictureFramingName,
                        url: uploadFileResult.newObjectUrl,
                        objectKey: uploadFileResult.newObjectKey,
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

    static async getModelSamplePictures(modelId) {
        const result = await prisma.model.findFirst({
            where: {
                id: modelId
            },
            include: {
                samplePictures: true
            }
        });

        if(!result) {
            return null;
        }

        return result.samplePictures;
    }
}

module.exports = Model;