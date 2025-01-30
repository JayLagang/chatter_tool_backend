const Model = require('../services/model_services');
const AIService = require('../services/ai_services');

exports.createModel = async (req, res) => {
    try {
        const modelExists = await Model.getModelByUserName(req.body.model.userName);

        if(modelExists) {
            return res.status(400).json({ success: false, message: 'Model already exists' });
        }
        
        const model = await Model.createModel(req.body.model);

        res.json({ success: true, message: 'Model created', data: model });

    } catch (error) {

        res.status(500).json({ success: false, message: error.message });

    }
};

exports.getModel = async (req, res) => {
    try {
        const model = await Model.getModel(req.params);
        return res.json({ success: true, data: model });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get model' });
    }
};

exports.getAllModels = async (req, res) => {
    try {
        const models = await Model.getAllModels();
        res.json({ success: true, data: models });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get models' });
    }
};

exports.updateAttributes = async (req, res) => {
    try {
        const model = await Model.updateAttributes(req.params.userName, req.body);
        res.json({ success: true, data: model });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to update model' });
    }
};

exports.addSocialPlatform = async (req, res) => {
    try {
        const model = await Model.addSocialPlatform(req.params.userName, req.body);
        res.json({ success: true, data: model });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to add social platform' });
    }
};

exports.updateSocialPlatform = async (req, res) => {
    try {
        const model = await Model.updateSocialPlatform(req.params.userName, req.body);
        res.json({ success: true, data: model });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to update social platform' });
    }
};

exports.uploadSamplePicture = async (req, res) => {
    try {
        const consolidatedDescription = await AIService.generateConsolidatedDescription({
            pictureFramingName: req.body.pictureFramingName,
            bodyPartNames: req.body.bodyPartNames,
            vaginaColorName: req.body.vaginaColorName
        });

        if(!consolidatedDescription) {
            return res.status(500).json({ success: false, message: 'Failed to generate consolidated description' });
        }
        req.body.consolidatedDescription = consolidatedDescription;

        const model = await Model.uploadModelSamplePicture(req.body);
        
        res.json({ success: true, data: model });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to upload sample picture' });
    }
};