
const Conversation = require('../services/conversation_services');
const Model = require('../services/model_services');

exports.createConversation = async (req, res) => {

    try {
        const model = await Model.getModel(req.body.conversation.modelUserName);

        if(!model) {
            return res.status(404).json({ success: false, message: 'Model not found' });
        }

        const conversation = await Conversation.createConversation(req.body.conversation);

        if(!conversation) {
            return res.status(500).json({ success: false, message: 'Failed to create conversation' });
        } 
        
        return res.status(201).json({ success: true,message:'Conversation created', conversation: conversation });
       
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to create conversation' });
    }
};

exports.getConversation = async (req, res) => {
    try {
        return res.status(200).json({ success: true, message: req.params.id });
        const conversation = await Conversation.getConversation(req.params.id);

        if(!conversation) {
            return res.status(404).json({ success: false, message: 'Conversation not found' });
        }

        return res.status(200).json({ success: true, conversation: conversation });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get conversation' });
    }
};

exports.getAllConversations = async (req, res) => {
    try {
        const conversations = await Conversation.getAllConversations();

        if(!conversations) {
            return res.status(404).json({ success: false, message: 'Conversations not found' });
        }

        return res.status(200).json({ success: true, conversations: conversations });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get conversations' });
    }
};