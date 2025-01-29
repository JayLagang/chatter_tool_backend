const AIService = require('../services/ai_services');
const ErrorResponse = require('../utils/error_response');

exports.getFlirtyHustlerResponse = async (req, res) => {
    
    const { newUserMessage } = req.body;
 
    if (!newUserMessage) {
        throw new ErrorResponse('newUserMessage is required', 400);
    }
    try {
        const response = await AIService.getFlirtyHustlerResponse(newUserMessage);
        if (!response) {
            throw new ErrorResponse('Failed to get response from AI service', 500);
        }

        // const parsedResponse = JSON.parse(response.content);    

        res.json({ success: true, data: response });
        
    } catch (error) {
        console.log(error.message);
        throw new ErrorResponse(error.message, 500);
    }
};

