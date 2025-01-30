const AIService = require('../services/ai_services');


exports.getFlirtyHustlerResponse = async (req, res) => {
    
    const { newUserMessage } = req.body;
 
    if (!newUserMessage) {
        return res.status(400).json({ success: false, message: 'Please provide a message' });
    }
    try {
        const response = await AIService.getFlirtyHustlerResponse(newUserMessage);
        if (!response) {
            return res.status(404).json({ success: false, message: 'No response found' });
        }

        res.json({ success: true, data: response });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: 'Failed to get response' });
    }
};

