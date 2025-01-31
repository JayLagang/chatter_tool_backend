const express = require('express');
const router = express.Router();
const ConversationValidators = require('../validators/conversation_validators');
const RequestValidator = require('../validators/request_validator');
const conversationController = require('../controllers/conversation_controller');
const parseMiddleware = require('../middlewares/multer_middleware');

router.post('/', ConversationValidators.createConversation(),RequestValidator.validate(), conversationController.createConversation);

router.get('/', conversationController.getAllConversations);

router.get('/:id', conversationController.getConversation);

// @desc    Save new message from sender
// @route   POST /conversation/:id
router.post('/:id', parseMiddleware, ConversationValidators.saveNewSenderMessage(), RequestValidator.validate(), conversationController.saveNewMessage);

// @desc    Generate AI response
// @route   POST /conversation/:id/generate_ai_response
router.get('/:id/generate_ai_response', conversationController.generateAIResponse);

module.exports = router;