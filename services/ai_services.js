const OpenAI= require('openai');
const dotenv = require('dotenv');
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true 
  });
  
class AIService {


    async getChatResponse(prompt) {
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                prompt,
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.7,
            });

            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error.message);
            throw new Error('Failed to fetch response from AI service');
        }
    }

    async getFlirtyHustlerResponse(prompt) {
        const systemMessage = {
            role: 'system',
            content: [
                {
                    type: 'text',
                    text: 'Create alluring responses that encourage continued messaging'
                }
            ]
        };
        const messages = [systemMessage];
        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: messages,
                temperature: 0.3,
                max_completion_tokens: 2048,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });

            return response;
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error.message);
            console.error('Error fetching response from OpenAI:', error);
            throw new Error('Failed to fetch response from AI service');
        }
    }
}

module.exports = AIService;
