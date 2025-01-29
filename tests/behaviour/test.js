const AIService = require('../../services/ai_services');
const aiServiceInstance = new AIService();

const goTest = async () => {
    const result = await aiServiceInstance.getFlirtyHustlerResponse({
        
    });
    return result;
}

goTest().then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
});