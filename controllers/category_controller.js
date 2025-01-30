const Category = require('../services/category_service');

exports.getAllVaginaColors = async (req, res) => {
    try {
        const vaginaColors = await Category.getAllVaginaColors();
        res.json({ success: true, data: vaginaColors });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get Vagina Colors' });
    }
};

exports.getAllSkinTones = async (req, res) => {
    try {
        const skinTones = await Category.getAllSkinTones();
        res.json({ success: true, data: skinTones });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get skin tones' });
    }
};

exports.getAllEthnicities = async (req, res) => {
    try {
        const ethnities = await Category.getAllEthnicities();
        res.json({ success: true, data: ethnities });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get ethnities' });
    }
};

exports.getAllSocialPlatforms = async (req, res) => {
    try {
        const socialPlatforms = await Category.getAllSocialPlatforms();
        res.json({ success: true, data: socialPlatforms });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get social platforms' });
    }
};

exports.getAllPictureFramings = async (req, res) => {
    try {
        const pictureFramings = await Category.getAllPictureFramings();
        res.json({ success: true, data: pictureFramings });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get picture framings' });
    }
};

exports.getAllBodyParts = async (req, res) => {
    try {
        const bodyParts = await Category.getAllBodyParts();
        res.json({ success: true, data: bodyParts });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get body parts' });
    }
};

exports.getAllSocialPlatforms = async (req, res) => {
    try {
        const socialPlatforms = await Category.getAllSocialPlatforms();
        res.json({ success: true, data: socialPlatforms });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get social platforms' });
    }
};

exports.getAllCitizenships = async (req, res) => {
    try {
        const citizenships = await Category.getAllCitizenships();
        res.json({ success: true, data: citizenships });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get citizenships' });
    }
};

exports.getAllEnglishProficiencyLevels = async (req, res) => {
    try {
        const englishProficiencyLevels = await Category.getAllEnglishProficiencyLevels();
        res.json({ success: true, data: englishProficiencyLevels });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get english proficiency levels' });
    }
};