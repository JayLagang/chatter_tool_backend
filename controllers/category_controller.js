const Category = require('../services/category_service');
const ErrorResponse = require('../utils/error_response');

exports.getAllVaginaColors = async (req, res) => {
    try {
        const vaginaColors = await Category.getAllVaginaColors();
        res.json({ success: true, data: vaginaColors });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

exports.getAllSkinTones = async (req, res) => {
    try {
        const skinTones = await Category.getAllSkinTones();
        res.json({ success: true, data: skinTones });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

exports.getAllEthnicities = async (req, res) => {
    try {
        const ethnities = await Category.getAllEthnicities();
        res.json({ success: true, data: ethnities });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

exports.getAllSocialPlatforms = async (req, res) => {
    try {
        const socialPlatforms = await Category.getAllSocialPlatforms();
        res.json({ success: true, data: socialPlatforms });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

exports.getAllPictureFramings = async (req, res) => {
    try {
        const pictureFramings = await Category.getAllPictureFramings();
        res.json({ success: true, data: pictureFramings });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

exports.getAllBodyParts = async (req, res) => {
    try {
        const bodyParts = await Category.getAllBodyParts();
        res.json({ success: true, data: bodyParts });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

exports.getAllSocialPlatforms = async (req, res) => {
    try {
        const socialPlatforms = await Category.getAllSocialPlatforms();
        res.json({ success: true, data: socialPlatforms });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

exports.getAllCitizenships = async (req, res) => {
    try {
        const citizenships = await Category.getAllCitizenships();
        res.json({ success: true, data: citizenships });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

exports.getAllEnglishProficiencyLevels = async (req, res) => {
    try {
        const englishProficiencyLevels = await Category.getAllEnglishProficiencyLevels();
        res.json({ success: true, data: englishProficiencyLevels });
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};