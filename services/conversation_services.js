const dotenv = require('dotenv');
const {prisma} = require('../config/database');

class Conversation {

    async createConversation(data) {
        
        const {senderUserName, modelUserName, samplePictureIds, platformName} = data;

        const result = await prisma.conversation.create({
            data: {
                senderUserName: senderUserName,
                model: {
                    connect: {
                        userName: modelUserName
                    }
                },
                platform: {
                    connect: {
                        name: platformName
                    }
                },
                samplePictures: {
                    connect: samplePictureIds.map((id) => {
                        return {
                            id: id
                        }
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
                model: true,
                samplePictures: true
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
        const {conversationId, senderRole, type, text, pictureFromSenderUrl, pictureFromModelUrl,pictureFromSenderKey,formattedUserSentImageAnalysis} = data;

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
                    pictureFromSenderKey: pictureFromSenderKey,
                    pictureFromSenderAnalysis: formattedUserSentImageAnalysis
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

    async insertModelMessages(data) {
        try {
            const result = await prisma.message.createMany({
                data: data.map((message) => {
                    return {
                        conversationId: message.conversationId,
                        messageIndex: message.messageIndex,
                        senderRole: 'assistant',
                        type: message.type,
                        text: message.type === 'text' ? message.text : undefined,
                        pictureFromModelUrl: message.type === 'text' ? undefined : message.pictureFromModelUrl
                    }
                })
            });

            if(!result) {
                return null;
            }

            return true;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}


module.exports = new Conversation();