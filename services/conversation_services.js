const dotenv = require('dotenv');
const {prisma} = require('../config/database');


class Conversation {
    
    async createConversation(data) {
        
        const {senderUserName, modelId, samplePictureIds} = data;

        const result = await prisma.conversation.create({
            data: {
                senderUserName: senderUserName,
                modelId: modelId,
                samplePictures: {
                    connect: samplePictureIds.map((id) => {
                        return {id: id};
                    })
                }
            }
        });

        if(!result) {
            return null;
        }

        return result;
    }

    async getConversationById(id) {
        return await prisma.conversation.findUnique({
            where: {
                id: id
            },
            include: {
                messages: true,
                model: true
            }
        });
    }

    async getAllConversations() {
        // last conversation first
        // include messages but limit to 1, take the message with highest messageIndex.
        return await prisma.conversation.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                messages: {
                    take: 1,
                    orderBy: {
                        messageIndex: 'desc'
                    }
                }
            }
        });
    }
    
    async insertMessage(data) {

        const {conversationId,senderRole, type, text, pictureFromSenderUrl,pictureFromModelUrl} = data;
        const currentMessagesCount = await prisma.message.count({
            where: {
                conversationId: conversationId
            }
        });
        const newMessageIndex = currentMessagesCount + 1;
        const result = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                messages: {
                    create: {
                        messageIndex: newMessageIndex,
                        senderRole: senderRole,
                        type: type,
                        text: text,
                        pictureFromSenderUrl: pictureFromSenderUrl,
                        pictureFromModelUrl: pictureFromModelUrl
                    }
                }
            }
        });

        if(!result) {
            return null;
        }

        return result;
    }
}


module.exports = Conversation;