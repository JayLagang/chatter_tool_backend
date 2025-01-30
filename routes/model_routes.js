const express = require('express');
const router = express.Router();
const modelController = require('../controllers/model_controller')
const ModelValidators = require('../validators/model_validators');
const RequestValidator = require('../validators/request_validator');

// @desc    Get a model
// @route   GET /api/model
router.get('/', ModelValidators.getModel(), RequestValidator.validate(), modelController.getModel)

// @desc    Create a model
// @route   POST /api/model/createModel
router.post('/createModel', ModelValidators.createModel(),RequestValidator.validate(), modelController.createModel)

// @desc    Get all models
// @route   GET /api/model/getAllModels
router.get('/getAllModels', modelController.getAllModels)

// @desc    Update a model
// @route   PUT /api/model/updateModel
router.put('/updateAttributes', modelController.updateAttributes)

// @desc    Add a social platform
// @route   PUT /api/model/addSocialPlatform
router.put('/addSocialPlatform', modelController.addSocialPlatform)

// @desc    Update a social platform
// @route   PUT /api/model/updateSocialPlatform
router.put('/updateSocialPlatform', modelController.updateSocialPlatform)

module.exports = router;