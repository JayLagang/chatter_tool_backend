const {prisma} = require('../config/database');

class Model {
    static async createModel(data) {
        const {userName, firstName, lastName, childCount, age, physicalAttributes} = data;
        // const {height, weight, bust, waist, skinToneName,ethnicityName} = physicalAttributes;
        const result = await prisma.model.create({
            data: {
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                childCount: childCount,
                age: age,
                physicalAttributes: {
                    create: physicalAttributes
                }
            }
        });
    }
}