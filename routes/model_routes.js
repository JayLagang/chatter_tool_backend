const express = require('express');
const router = express.Router();
const modelController = require('../controllers/model_controller')

router.post('/createModel', modelController.createModel)

router.get('/getModel', modelController.getModel)

router.get('/getAllModels', modelController.getAllModels)

router.put('/updateAttributes', modelController.updateAttributes)

router.put('/addSocialPlatform', modelController.addSocialPlatform)

router.put('/updateSocialPlatform', modelController.updateSocialPlatform)

module.exports = router;