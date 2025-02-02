const Conversation = require('../services/conversation_services');
const AIService = require('../services/ai_services');
const Model = require('../services/model_services');
const {uploadFileUtil,deleteObject} = require('../utils/s3_files_handler');
exports.createConversation = async (req, res) => {

    try {

        const model = await Model.getModel({userName: req.body.conversation.modelUserName});

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

exports.saveNewMessage = async (req, res) => {

    try {

        let uploadFileResult;

        if (req.body.type === 'picture' && req.body.senderRole === 'user'){

            req.uploadFileParams = {
                file: req.files.image_file[0],
                folder: 'sender-sent-pictures',
                fileSizeLimit: 50
            }

            uploadFileResult = await uploadFileUtil(req);

            if(!uploadFileResult){
                return res.status(500).json({ success: false, message: 'Failed to upload file' });
            }

            // analyze the image using the AIService.analyzeImageSuggestiveness function
            const imageAnalysis = await AIService.analyzeImageSuggestiveness(uploadFileResult.newObjectUrl);

            if(imageAnalysis.status !== 'success') {
                return res.status(500).json({ success: false, message: 'Failed to analyze image' });
            }
            
            req.body.formattedUserSentImageAnalysis = {
                very_suggestive: imageAnalysis.nudity.very_suggestive,
                suggestive: imageAnalysis.nudity.suggestive,
                mildly_suggestive: imageAnalysis.nudity.mildly_suggestive,
                sexual_activity: imageAnalysis.nudity.sexual_activity,
                sexual_display: imageAnalysis.nudity.sexual_display,
                erotica: imageAnalysis.nudity.erotica,
                context: imageAnalysis.nudity.context
            };
        }

        

        const newMessageData = {
            conversationId: req.params.id,
            senderRole: req.body.senderRole,
            type: req.body.type,
            text: req.body?.text || undefined,
            pictureFromSenderUrl: req.body.type === 'picture' ? uploadFileResult.newObjectUrl : undefined,
            pictureFromSenderKey: req.body.type === 'picture' ? uploadFileResult.newObjectKey : undefined,
            pictureFromModelUrl: req.body.type === 'picture' ?   req.body.pictureFromModelUrl : undefined,
            formattedUserSentImageAnalysis: req.body.formattedUserSentImageAnalysis || undefined
        };

        const newMessage = await Conversation.insertSenderMessage(newMessageData);
        
        if(!newMessage) {

            if(req.body.type === 'picture' && req.body.senderRole === 'user'){
                const deleteResult = await deleteObject(uploadFileResult.newObjectKey);

                if(!deleteResult){
                    console.error('Failed to delete uploaded file');
                }
            }
            return res.status(404).json({ success: false, message: 'Failed to insert new message' });
        }
        const updatedConversation = await Conversation.getConversation(req.params.id);
        return res.status(201).json({ success: true, message: 'Message inserted', updatedConversation: updatedConversation });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to insert message' });
    }
};

exports.saveNewAiMessages = async (req, res) => {
    
    try {

        const conversation = await Conversation.getConversation(req.params.id);
        
        if(!conversation) {
            return res.status(404).json({ success: false, message: 'Conversation not found' });
        }

        const newMessages = req.body.messages;

        if(!newMessages || newMessages.length === 0) {
            return res.status(400).json({ success: false, message: 'Messages are required' });
        }

        const newMessagesData = newMessages.map(message => {
            return {
                conversationId: req.params.id,
                messageIndex: message.messageIndex,
                type: message.type,
                text: message.text,
                pictureFromModelUrl: message.pictureFromModelUrl
            }
        });

        const newMessagesResult = await Conversation.insertModelMessages(newMessagesData);

        if(!newMessagesResult) {
            return res.status(500).json({ success: false, message: 'Failed to insert messages' });
        }

        const updatedConversation = await Conversation.getConversation(req.params.id);

        return res.status(201).json({ success: true, message: 'Messages inserted', updatedConversation: updatedConversation });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to insert messages' });
    }
};

exports.generateAIResponse = async (req, res) => {

    try {

        const conversation = await Conversation.getConversation(req.params.id);

        if(!conversation) {
            return res.status(404).json({ success: false, message: 'Conversation not found' });
        }
        const lastMessageIsFromUser = await AIService.lastMessageIsFromUser(conversation.messages);

        if(!lastMessageIsFromUser){
            return res.status(400).json({ success: false, message: 'Unable to generate. Last message is not from user' });
        }
        // const modelSamplePictures = await Model.getModelSamplePictures(conversation.model.id);
        const model = await Model.getModelById({modelId: conversation.model.id});
        const response = await AIService.generateAIResponse(conversation,model);
        
        if(!response) {
            return res.status(500).json({ success: false, message: 'Failed to generate AI response' });
        }

        return res.status(200).json({ success: true, message: 'AI response generated', data: response });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to generate AI response' });
    }
};