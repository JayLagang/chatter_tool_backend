const AIService = require('../services/ai_services');

const getChatResponse = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const response = await AIService.getChatResponse(prompt);
        res.json({ response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getChatResponse };
