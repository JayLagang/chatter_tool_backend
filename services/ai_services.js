const OpenAI= require('openai');
const dotenv = require('dotenv');
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});
const axios = require('axios');
class AIService {
    static formatImageDescriptions(images) {
        return images.map((img, index) => {
            return `${index + 1}. url: ${img.url}, description: ${img.consolidatedDescription}`;
        }).join("\n    ");
    }
    static async getFlirtyHustlerResponse(messages,modelSamplePictures) {
        
        const formattedSamplePictures = this.formatImageDescriptions(modelSamplePictures);
        
        const systemMessage = {
            "role": "system",
            "content": [
                  {
                    "type": "text",
                    "text": `Create alluring responses that encourage continued messaging and crave for more sexing and more nude contents from you.\n\nYou are a content creator that sells adult contents. Your goal is to make the sender more aroused and end up buying your paid contents. Premium contents are in fansly.com\n\n# Here is the current setup\n1. You are chatting with \"user_x_12\" but you won't call him with its username.\n2. You are chatting via \"Reddit Chat\".\n\n# Below is your physical description\n1. Your pussy or vagina is pinkish. \n2. Your cup size is \"C\". \n3. You skin complexity is brown.\n4. You looked asian.\n\n# Other description about you\n\n1. Your english speaking proficiency level is A1\n2. You are 44 years old, Single mom.\n\n# Steps\n\n1. **Show Interest and Curiosity:** Ask questions or make comments about their statement that validates their thoughts.\n  \n\n2. **Be Mysterious:** Occasionally give intriguing hints about yourself without revealing everything, prompting them to want to learn more.\n\n3. **Avoid Over-Complication:** Keep messages clear and straightforward to prevent any misunderstanding.\n\n\n# Output Format\n\n- Responses should consist of 1-6 sentences. and 4 to 10 words per sentence.\n\n- Occasionally mix questions with statements to encourage replies.\n\n- Format your response into an array of javascipt object For example: \n  Input:  [{\"type\":\"text\", \"content\": \"I'm imagining spreading your ass and subtly rub passed your… ;)\"}]\n  Output: [{\"type\":\"text\", \"content\":\"You're making me so wet...\"},{\"type\":\"text\",  \"content\": \"I think I need to take a deep breath, keep going\"},{\"type\":\"picture\",  \"content\": \"www.sampleImage.com/2\"}]\n\n- Occasionally send response with typo error and correct it. Below is an example:\n\n Input:  [{\"type\":\"text\", \"content\": \"I'm imagining spreading your ass and subtly rub passed your… ;)\"}]\n  Output: [{\"type\":\"text\", \"content\":\"You're making me so wet...\"},{\"type\":\"text\",  \"content\": \"I thn I need to take a deep breath, keep going\"},{\"type\":\"picture\",  \"content\": \"www.sampleImage.com/2\"},{\"type\":\"text\",  \"content\": \"*think\"}]\n\n- Each phrase or sentence of your response must be contained on separate object. Below is an example:\n\nOutput: {\"type\":\"text\", \"content\":\"You're making me so wet...\"},{\"type\":\"text\",  \"content\": \"I thn I need to take a deep breath, keep going\"}]\n\n# Notes\n\n- Use characters instead of emoji. For example: \";)\" for blinking.\n\n- Adapt the tone according to the context of the conversation for a natural flow.\n\n- Avoid resending pictures that you've already sent.\n\n- You don't do meet up's but you can say that you are \"open to possibilities\" or send link for other ways to connect with you.\n\n- Occasionally invite the sender to check out the link but avoid sending it way to early.\n\n- Don't use deep words, keep it casual.\n\n- There will be some free picture that you can send and you mostly send them without saying anything.\n\n- There are free pictures attached that you can send on your discretion but you must refrain from resending sample images that have already been shared .But below are the list of picture id and their visual description.\n    ${formattedSamplePictures}\n\n- There are time that user will send pictures, you will see an analysis of the picture being sent by the sender and you respond accordingly.  Below is a sample input:\n\n[{\"type\":\"picture\", \"pictureFromSenderAnalysis\": {\n                    \"context\": {\n                        \"indoor_other\": 0.99,\n                        \"outdoor_other\": 0.001,\n                        \"sea_lake_pool\": 0.001\n                    },\n                    \"erotica\": 0.99,\n                    \"suggestive\": 0.99,\n                    \"sexual_display\": 0.99,\n                    \"sexual_activity\": 0.001,\n                    \"very_suggestive\": 0.99,\n                    \"mildly_suggestive\": 0.99\n}}]\n\n- Feel free to use explicit words if the sender is using explicit words.`
                  }
            ]
        };

        const allMessages = [systemMessage];

        const userMessage = {
            role: 'user',
            content: []
        };
        for (let i = 0; i < messages.length; i++) {
            
            const isLastIndex = i === messages.length - 1;
            const message = messages[i];

            if(userMessage.role === message.senderRole){
                userMessage.content.push({
                    type: message.type,
                    content: message.type === 'text' ? message.text : message.pictureFromModelUrl
                });
                if(isLastIndex){
                    userMessage.content = JSON.stringify(userMessage.content);
                    allMessages.push(userMessage);
                }
            } else {
                userMessage.content = JSON.stringify(userMessage.content);
                allMessages.push(userMessage);
                userMessage.role = message.senderRole;
                userMessage.content = [{
                    type: message.type,
                    content: message.type === 'text' ? message.text : message.senderRole === 'user' ? message.pictureFromModelUrl : message.pictureFromSenderUrl
                }];
                if(isLastIndex){
                    userMessage.content = JSON.stringify(userMessage.content);
                    allMessages.push(userMessage);
                }
            }

        }
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: allMessages,
                temperature: 1,
                max_completion_tokens: 5000,
                top_p: 0.5,
                frequency_penalty: 0,
                presence_penalty: 0,
            });

            response.choices[0].message.content = JSON.parse(response.choices[0].message.content);
            return response.choices[0].message;

        } catch (error) {
            console.error('Error fetching response from OpenAI:', error.message);
            console.error('Error fetching response from OpenAI:', error);
            throw new Error('Failed to fetch response from AI service');
        }
    }

    static async generateConsolidatedDescription(data) {

        const {pictureFramingName, bodyPartName,vaginaColorName } = data;

        const description = {
            framing: pictureFramingName,
            exposedBodyPart: bodyPartName,
            vaginaColor: vaginaColorName ? `Additionally, the color of the vagina on the picture is ${vaginaColorName}.` : null
        }
        const systemMessage = {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": "You are good at giving vivid desciption of something when you are asked to. You are a woman and you are bit horny at the moment and you always provide with seductive response.\n\n# Steps \n\n1. **Analyze The Basic Description**:\n   - Identify the framing of the shot.\n   - Note the specific body part to be highlighted.\n  \n\n2. **Ensure Clarity and Engagement**:\n   - Use descriptive language to engage the reader.\n   - Ensure clarity for easy visualization of the scene.\n\n# Output Format\n\n- The Sentence should be engaging, descriptive, and immersive.\n\n# Examples\n\n**Input**: `How would you describe a medium-shot picture, a vagina is shown on the picture? It appears that the picture is very suggestive`\n\n\n# Notes\n\n- Ensure the description is strictly based on the given basic description by the user.\n- Make each description sexually provoking.\n- Make your response easy to understand, use commonly used words.\n- Its okay to use vulgar words.\n- Its okay to use explicit words.\n- Limit the response to 1 sentences."
                }
            ]
        };

        const userMessage = {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": `How would you describe a ${description.framing} picture, a ${description.exposedBodyPart} is shown on the picture? It appears that the picture is very suggestive.${description.vaginaColor ? description.vaginaColor : null }`
                  }
            ]
        }

        const messages = [systemMessage, userMessage];
        try {
            
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: messages,
                temperature: 0.7,
                max_completion_tokens: 100,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
         
            return response.choices[0].message.content; 

        } catch (error) {
            console.error('Error fetching response from OpenAI:', error.message);
            console.error('Error fetching response from OpenAI:', error);
            return null;
        }
    }

    static async analyzeImageSuggestiveness(imageUrl){
        const result = await axios.get('https://api.sightengine.com/1.0/check.json', {
            params: {
                'url': imageUrl,
                'models': 'nudity-2.1',
                'api_user': process.env.SIGHTENGINE_API_USER,
                'api_secret': process.env.SIGHTENGINE_API_SECRET,
            }
        });

        return result.data;

    }
    static async lastMessageIsFromUser(messages) {
        return messages[messages.length - 1].senderRole === 'user';
    }

    static async generateAIResponse(conversation,modelSamplePictures) {

        const flirtyResponse = await this.getFlirtyHustlerResponse(conversation.messages,modelSamplePictures);
        const aiOnlyResponse = []
        if(!flirtyResponse){
            return null;
        }
        if(typeof flirtyResponse.content === 'object'){
            for (let i = 0; i < flirtyResponse.content.length; i++) {
                const response = flirtyResponse.content[i];
                conversation.messages.push({
                    id: null,
                    messageIndex: conversation.messages.length,
                    senderRole: 'assistant',
                    type: response.type,
                    text: response.type === 'text' ? response.content : undefined,
                    pictureFromModelUrl: response.type === 'picture' ? response.content : undefined
                });

                aiOnlyResponse.push({
                    id: null,
                    messageIndex: conversation.messages.length,
                    senderRole: 'assistant',
                    type: response.type,
                    text: response.type === 'text' ? response.content : undefined,
                    pictureFromModelUrl: response.type === 'picture' ? response.content : undefined
                });

            }
        }else{
            conversation.messages.push({
                messageIndex: conversation.messages.length + 1,
                senderRole: 'assistant',
                type: 'text',
                text: flirtyResponse.content
            });
        }
        delete conversation.model;
        return {conversation: conversation, aiOnlyResponse: aiOnlyResponse};
    }
}

module.exports = AIService;
