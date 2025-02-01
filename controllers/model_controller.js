const Model = require('../services/model_services');
const AIService = require('../services/ai_services');
const {uploadFileUtil,deleteObject} = require('../utils/s3_files_handler');

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
        const model = await Model.getModel(req.query);
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

exports.updateBasicDetails = async (req, res) => {
    try {
        const model = await Model.updateBasicDetails(req.body.model);
        res.json({ success: true, data: model });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to update basic details' });
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
        const model = await Model.addSocialPlatform(req.body);
        res.json({ success: true, data: model });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to add social platform' });
    }
};

exports.deleteSocialPlatform = async (req, res) => {
    try {
        const model = await Model.deleteSocialPlatform(req.body);
        res.json({ success: true, data: model });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to delete social platform' });
    }
};

exports.updateSocialPlatform = async (req, res) => {
    try {
        const model = await Model.updateSocialPlatform(req.body);
        res.json({ success: true, data: model });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to update social platform' });
    }
};

exports.uploadSamplePicture = async (req, res) => {
    const modelId = req.params.id;
    try {

        if(!modelId){
            return res.status(400).json({ success: false, message: 'Model id is required' });
        }

        req.body.modelId = modelId;

        req.uploadFileParams = {
            file: req.files.image_file[0],
            folder: 'model_sample_pictures',
            fileSizeLimit: 50
        }

        const uploadFileResult = await uploadFileUtil(req);

        if(!uploadFileResult){
            return res.status(500).json({ success: false, message: 'Failed to upload file' });
        }
        
        req.body.uploadFileResult = uploadFileResult;
        
        const consolidatedDescription = await AIService.generateConsolidatedDescription({
            pictureFramingName: req.body.pictureFramingName,
            bodyPartName: req.body.bodyPartName,
            vaginaColorName: req.body.vaginaColorName || null
        });
        console.log("consolidatedDescription",consolidatedDescription);
        if(!consolidatedDescription) {
            return res.status(500).json({ success: false, message: 'Failed to generate consolidated description' });
        }
        req.body.consolidatedDescription = consolidatedDescription;

        const model = await Model.uploadModelSamplePicture(req.body);
        
        res.json({ success: true, message:"Sample picture uploaded", data: model });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Failed to upload sample picture' });
    }
};