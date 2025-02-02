const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category_controller');

router.get('/vagina_colors', categoryController.getAllVaginaColors);

router.get('/skin_tones', categoryController.getAllSkinTones)

router.get('/ethnicities', categoryController.getAllEthnicities)

router.get('/social_platforms', categoryController.getAllSocialPlatforms)

router.get('/picture_framings', categoryController.getAllPictureFramings)

router.get('/body_parts', categoryController.getAllBodyParts)

// router.get('/social_platforms', categoryController.getAllSocialPlatforms)

router.get('/citizenship', categoryController.getAllCitizenships)

router.get('/english_levels', categoryController.getAllEnglishProficiencyLevels)

module.exports = router;
