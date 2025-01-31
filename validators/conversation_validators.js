const {body, query } = require('express-validator');

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
            body('text').optional().isString().withMessage('Text must be a string')
        ]
    }
}

module.exports = new ConversationValidators();