const Model = require('../services/model_services');
const ErrorResponse = require('../utils/error_response');

exports.createModel = async (req, res) => {
    try {
        const model = await Model.createModel(req.body);
        res.json({ success: true, data: model });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

exports.getModel = async (req, res) => {
    try {
        const model = await Model.getModel(req.params.userName);
        res.json({ success: true, data: model });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

exports.getAllModels = async (req, res) => {
    try {
        const models = await Model.getAllModels();
        res.json({ success: true, data: models });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

exports.updateAttributes = async (req, res) => {
    try {
        const model = await Model.updateAttributes(req.params.userName, req.body);
        res.json({ success: true, data: model });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

exports.addSocialPlatform = async (req, res) => {
    try {
        const model = await Model.addSocialPlatform(req.params.userName, req.body);
        res.json({ success: true, data: model });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

exports.updateSocialPlatform = async (req, res) => {
    try {
        const model = await Model.updateSocialPlatform(req.params.userName, req.body);
        res.json({ success: true, data: model });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};