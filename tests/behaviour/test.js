const AIService = require('../../services/ai_services');

const goTest = async () => {
    const result = await AIService.generateConsolidatedDescription({
        pictureFramingName: 'Full Body',
        bodyPartNames: ['Breasts','Face'],
        vaginaColorName: undefined
    });
    return result;
}

goTest().then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
});