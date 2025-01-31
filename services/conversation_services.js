const dotenv = require('dotenv');
const {prisma} = require('../config/database');

class Conversation {

    async createConversation(data) {
        
        const {senderUserName, modelUserName, samplePictureIds} = data;

        const result = await prisma.conversation.create({
            data: {
                senderUserName: senderUserName,
                model: {
                    connect: {
                        userName: modelUserName
                    }
                },
                samplePictures: samplePictureIds.length === 0 ? undefined : {
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

    async getConversation(id) {
        return await prisma.conversation.findUnique({
            where: {
                id: id
            },
            include: {
                messages: {
                    orderBy: {
                        messageIndex: 'asc'
                    }
                },
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

    async insertSenderMessage(data) {
        const {conversationId, senderRole, type, text, pictureFromSenderUrl, pictureFromModelUrl,pictureFromSenderKey} = data;

        try {

            const currentMessagesCount = await prisma.message.count({
                where: {
                    conversationId: conversationId
                }
            });

            const newMessageIndex = currentMessagesCount + 1;

            const result = await prisma.message.create({
                data: {
                    conversationId: conversationId,
                    messageIndex: newMessageIndex,
                    senderRole: senderRole,
                    type: type,
                    text: type === 'text' ? text : undefined,
                    pictureFromSenderUrl: pictureFromSenderUrl,
                    pictureFromModelUrl: pictureFromModelUrl,
                    pictureFromSenderKey: pictureFromSenderKey
                }
            });
            

            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async insertModelMessage(data) {
        const {conversationId, type, text, pictureFromModelUrl} = data;

        try {

            const currentMessagesCount = await prisma.message.count({
                where: {
                    conversationId: conversationId
                }
            });

            const newMessageIndex = currentMessagesCount + 1;

            const result = await prisma.message.create({
                data: {
                    conversationId: conversationId,
                    messageIndex: newMessageIndex,
                    senderRole: 'assistant',
                    type: type,
                    text: type === 'text' ? text : undefined,
                    pictureFromModelUrl: pictureFromModelUrl
                }
            });
            console.log("result", result);

            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}


module.exports = new Conversation();