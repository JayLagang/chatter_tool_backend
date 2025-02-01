const {body, query} = require('express-validator');

class ModelValidators {
    createModel() {
        return [
            body('model.userName').notEmpty().withMessage('Username is required').isString().withMessage('Username must be a string'),
            body('model.firstName').optional().isString().withMessage('First name must be a string'),
            body('model.lastName').optional().isString().withMessage('Last name must be a string'),
            body('model.childCount').optional().isNumeric().withMessage('Child count must be a number'),
            body('model.age').optional().isNumeric().withMessage('Age must be a number'),
            body('model.physicalAttributes.height').optional().isNumeric().withMessage('Height must be a number'),
            body('model.physicalAttributes.weight').optional().isNumeric().withMessage('Weight must be a number'),
            body('model.physicalAttributes.bust').optional().isNumeric().withMessage('Bust must be a number'),
            body('model.physicalAttributes.waist').optional().isNumeric().withMessage('Waist must be a number'),
            body('model.physicalAttributes.skinToneName').optional().isString().withMessage('Skin tone name must be a string'),
            body('model.physicalAttributes.ethnicityName').optional().isString().withMessage('Ethnicity name must be a string')
        ]
    }

    getModel() {
        return [
            query('userName').notEmpty().withMessage('Username is required').isString().withMessage('Username must be a string')
        ]
    }

    uploadSamplePicture() {
        return [
            body('bodyPartName').notEmpty().isIn(['Face', 'Boobs', 'Vagina', 'Butt', 'Feet', 'Whole-body']).withMessage('Body part name must be either Face, Boobs, Vagina or Butt', 'Feet', 'Whole-body'),
            body('pictureFramingName').notEmpty().isIn(['Closeup Shot', 'Portrait Shot', 'Full-body Shot']).withMessage('pictureFramingName must be either Closeup Shot, Portrait Shot, Full-body Shot'),
            body('vaginaColorName').optional().isIn(['Pink', 'Reddish', 'Brown', 'Pale Brown', 'Dark Brown', undefined]).withMessage('vaginaColorName must be either Pink, Reddish, Brown, Pale Brown, Dark Brown')
        ]
    }
}

module.exports = new ModelValidators();