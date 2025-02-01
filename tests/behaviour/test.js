const AIService = require('../../services/ai_services');

const goTest = async () => {
    // const result = await AIService.generateConsolidatedDescription({
    //     pictureFramingName: 'Full Body',
    //     bodyPartNames: ['Breasts','Face'],
    //     vaginaColorName: undefined
    // });
    const result = await AIService.analyzeImageSuggestiveness('https://chattertool.s3.ap-southeast-1.amazonaws.com/model_sample_pictures/d4a1564a-fd57-427d-8968-ba18219c73c6-%28m%3De-yaaGqaq%29%28mh%3Dxl6fbRrkbz9UxO7V%29original_830758711.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA2S2Y4SJI5DU3QNL4%2F20250201%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250201T141523Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEM7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkcwRQIgUkF8BmZUoWAXxLQbOpnl4qqrFl05S5JEzayIRxDhxfACIQDJOx0Ozwew8OUf6u40G3Bw6FGKvbjrcpQBedrzqZU%2F%2BCr1AgjX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDcyNzY0NjUwNzYwMSIMDUG5xrJgfJ7NPDgDKskCJeRla%2BxdE7kyFe%2BfmmhZegwL1KhwLKDUyWWMctBGoH7Zyps2Rv8XMsIJkmtu2UbcF4rCarPjuGNY2r93tKdH1LZF3o6Twf26L0ETRK0GYtPe9r6yZy%2BbPdpoR%2F%2F%2FtM1qCM%2B6rXvmEJQhBKhxBYLKBXKjFsL6IdbPaMjqMxW1Rxi1BffCszaH0Qs%2BWkyO%2FWTAqytpWhnSwgdx0V4Oea7vnfpmckmtALBro4p6Ivdk6L2smqhOEC4wiaTMa5rp3ptHsPAklsnOta%2BT%2BokQOvGcgf0%2BrMYu%2FRSnTFEZh8ta2NHFnySH3O7MPZIQ3wBF60B%2FsNLYVJWQQkee9iwk7uNYgJXu9ZDxW6iPG7FLnSb%2Bu%2BZIan3oL5%2BUldvJJjYOvDYNhpoBXRmIvtS9dY6h4yUPhUaalarxZDdr995x9xY9V2sXh5vqBUABrsQw4tj4vAY6swJhzDzDd3i4EDVIr3wIRX%2FQvrGalr9EvAHFZIu53erFy%2B9tk7ud9s8ljjgLOGQNYXnv7Gm72c6sLLj1r16YqINDDpNeiIStmanmdpjsfBG6rSGac4%2BG%2Fi9eUtj%2FUFXud7GQVzM2mKuxGMVlzVtVmNEi83VUa5gSyF16gCmuOxRLG8G55JNad9T6q47niL2lZ5mN5Tx9rxpd%2FR%2FghAWGx1VSrKIxoFwINCN5muv7%2B3klNgONVEVRylZ%2FxHDYh9r37h7Jab87yEJvelDNvVRI4dcgUc%2Fw%2FL4jSumt1%2BrWkzKgB8my8PmFJPfryU%2BVwuQt9Or1jFQesLudCbAHLSlQiuBk8RW8FpCJbL4QCFwpE6XANyitsoeRrP0mQF68VXVALV51lx%2BPk%2F9RfV8WJKsZF7jTI0ss&X-Amz-Signature=f51f49fe1c6609c18bcafad2f6c34fd96499de665465f499f7239361a420cf13&X-Amz-SignedHeaders=host&response-content-disposition=inline');
    return result;
}

goTest().then((response) => {
    console.log(response);
}).catch((error) => {
    console.error(error);
});