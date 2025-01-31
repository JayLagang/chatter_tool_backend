const Conversation = require('../services/conversation_services');
const Model = require('../services/model_services');
const {uploadFileUtil,deleteObject} = require('../utils/s3_files_handler');
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

exports.saveNewSenderMessage = async (req, res) => {

    try {
        console.log("req.files.pictureFromSenderFile[0]: ", req.files.pictureFromSenderFile[0])
        req.uploadFileParams = {
            file: req.files.pictureFromSenderFile[0],
            folder: 'sender-sent-pictures',
            fileSizeLimit: 50
        }

        let uploadFileResult;

        if (req.body.type === 'picture'){
            
            uploadFileResult = await uploadFileUtil(req);

            if(!uploadFileResult){
                return res.status(500).json({ success: false, message: 'Failed to upload file' });
            }
        }
        const newMessageData = {
            conversationId: req.params.id,
            senderRole: 'user',
            type: req.body.type,
            text: req.body?.text || undefined,
            pictureFromSenderUrl: req.body.type === 'picture' ? uploadFileResult.newObjectUrl : undefined,
            pictureFromSenderKey: req.body.type === 'picture' ? uploadFileResult.newObjectKey : undefined,
        };

        const newMessage = await Conversation.insertSenderMessage(newMessageData);
        
        if(!newMessage) {

            if(req.body.type === 'picture'){
                const deleteResult = await deleteObject(uploadFileResult.newObjectKey);

                if(!deleteResult){
                    console.error('Failed to delete uploaded file');
                }
            }
            return res.status(404).json({ success: false, message: 'Failed to insert new message' });
        }

        return res.status(201).json({ success: true, message: 'Message inserted', message: newMessage });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to insert message' });
    }
};