const {body, query} = require('express-validator');

class ConversationValidators {
    createConversation() {
        return [
            body('conversation.senderUserName').notEmpty().withMessage('Sender username is required').isString().withMessage('Sender username is required'),
            body('conversation.modelUserName').notEmpty().withMessage('Model username is required').isString().withMessage('Model username must be a string'),
            body('conversation.samplePictureIds').optional().isArray().withMessage('Sample picture ids must be an array'),
        ];
    }

    getConversation() {
        return [
            query('name').isString().notEmpty(),
        ];
    }

    updateConversation() {
        return [
            query('name').isString().notEmpty(),
            body('participants').isArray().notEmpty(),
            body('messages').isArray().notEmpty(),
        ];
    }
}

module.exports = new ConversationValidators();