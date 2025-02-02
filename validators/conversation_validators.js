const {body, query } = require('express-validator');

class ConversationValidators {
    createConversation() {
        return [
            body('conversation.senderUserName').notEmpty().withMessage('Sender username is required').isString().withMessage('Sender username is required'),
            body('conversation.platformName').notEmpty().withMessage('Platform name is required').isString().withMessage('Platform name must be a string'),
            body('conversation.modelUserName').notEmpty().withMessage('Model username is required').isString().withMessage('Model username must be a string'),
            body('conversation.samplePictureIds').optional().isArray().withMessage('Sample picture ids must be an array'),
        ];
    }

    getConversation() {
        return [
            query('id').isString().notEmpty(),
        ];
    }

    updateConversation() {
        return [
            query('name').isString().notEmpty(),
            body('participants').isArray().notEmpty(),
            body('messages').isArray().notEmpty(),
        ];
    }

    saveNewSenderMessage(){
        return [
            // type must be either text or picture 
            body('type').notEmpty().isIn(['text', 'picture']).withMessage('Type must be either text or picture'),
            body('text').optional().isString().withMessage('Text must be a string'),
            body('senderRole').notEmpty().isIn(['user', 'assistant']).withMessage('Sender role must be either user or assistant'),
        ]
    }
}

module.exports = new ConversationValidators();