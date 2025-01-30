
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