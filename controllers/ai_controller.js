const AIService = require('../services/ai_services');
const ErrorResponse = require('../utils/error_response');
exports.getChatResponse = async (req, res) => {
    const { prompt } = req.body;
 
    if (!prompt) {
        throw new ErrorResponse('Prompt is required', 400);
    }
    try {
        const response = await AIService.getFlirtyHustlerResponse(prompt);
        res.json({ success: true, data: response });
    } catch (error) {
        throw new ErrorResponse(error.message, 500);
    }
};

