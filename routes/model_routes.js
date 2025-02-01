const express = require('express');
const router = express.Router();
const modelController = require('../controllers/model_controller')
const ModelValidators = require('../validators/model_validators');
const RequestValidator = require('../validators/request_validator');
const parseMiddleware = require('../middlewares/multer_middleware');
// @desc    Get a model
// @route   GET /api/model
router.get('/', ModelValidators.getModel(), RequestValidator.validate(), modelController.getModel)

// @desc    Create a model
// @route   POST /api/model/createModel
router.post('/createModel', ModelValidators.createModel(),RequestValidator.validate(), modelController.createModel)

// @desc    Get all models
// @route   GET /api/model/getAllModels
router.get('/getAllModels', modelController.getAllModels)
// @desc Update basic details
// @route PUT /api/model/updateBasicDetails
router.put('/updateBasicDetails', modelController.updateBasicDetails)
// @desc    Update a model
// @route   PUT /api/model/updateAttributes
router.put('/updateAttributes', modelController.updateAttributes)

// @desc    Add a social platform
// @route   PUT /api/model/addSocialPlatform
router.put('/addSocialPlatform', modelController.addSocialPlatform)

// @desc Delete a social platform  
// @route DELETE /api/model/deleteSocialPlatform
router.delete('/deleteSocialPlatform', modelController.deleteSocialPlatform)

// @desc    Update a social platform
// @route   PUT /api/model/updateSocialPlatform
router.put('/updateSocialPlatform', modelController.updateSocialPlatform)

// @desc Add model sample pictures
// @route POST /api/model/:id/sample_picture
router.post('/:id/sample_picture',parseMiddleware,ModelValidators.uploadSamplePicture(),RequestValidator.validate(), modelController.uploadSamplePicture)

// @desc Update sample picture data
// @route PUT /api/model/:id/sample_picture
router.put('/:id/sample_picture',ModelValidators.uploadSamplePicture(),RequestValidator.validate(), modelController.updateSamplePicture)

// @desc Delete sample picture
// @route DELETE /api/model/:id/sample_picture
router.delete('/:id/sample_picture', modelController.deleteSamplePicture)

module.exports = router;