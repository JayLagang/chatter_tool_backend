const express = require('express');
const router = express.Router();
const ConversationValidators = require('../validators/conversation_validators');
const RequestValidator = require('../validators/request_validator');
const conversationController = require('../controllers/conversation_controller');

router.post('/', ConversationValidators.createConversation(),RequestValidator.validate(), conversationController.createConversation);

module.exports = router;