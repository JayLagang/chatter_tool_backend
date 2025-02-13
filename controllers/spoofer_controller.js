const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const { prisma } = require('../config/database');
const randomWords = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry', 'strawberry', 'tangerine', 'watermelon', 'avocado', 'blackberry', 'coconut', 'dragonfruit', 'eggplant', 'fennel', 'guava', 'huckleberry', 'jackfruit', 'kumquat', 'lychee', 'mulberry', 'nectarine', 'olive', 'pomegranate', 'quince', 'rhubarb', 'starfruit', 'tamarind', 'ugli', 'vanilla', 'watercress', 'yam', 'zucchini', 'almond', 'blackberry', 'cashew', 'date', 'elderberry', 'fig', 'grapefruit', 'hazelnut', 'jackfruit', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'papaya', 'quince', 'raspberry', 'strawberry', 'tangerine', 'watermelon', 'avocado', 'blackberry', 'coconut', 'dragonfruit', 'eggplant', 'fennel', 'guava', 'huckleberry', 'jackfruit', 'kumquat'];

const verbs = [
    "run", "jump", "swim", "speak", "read", "write", "eat", "drink", "sleep", "laugh",
    "cry", "think", "watch", "hear", "listen", "see", "feel", "walk", "talk", "dance",
    "play", "sing", "study", "work", "help", "love", "hate", "want", "need", "buy",
    "sell", "give", "take", "call", "answer", "ask", "tell", "believe", "understand", "create",
    "build", "destroy", "fix", "break", "teach", "learn", "join", "lead", "follow", "lead",
    "paint", "draw", "organize", "clean", "cook"
];

exports.generateSpoofedImages = async (job) => {
    try {

        const { files, body } = job.data;
        const ip = body.client_ip;
        const imageFile = files.image_file[0];
        const imageBuffer = Buffer.from(imageFile.buffer.data);
        const copyCount = parseInt(body.copy_count) || 5;
        const variations = [];

        // Get original image metadata
        const metadata = await sharp(imageBuffer).metadata();
        const { width, height } = metadata;

        // Function that combines random words. Output should be at least 5 words and maximum 10 words. Must have subject, verb, and object
        const generateRandomSentence = () => {
            const subject = randomWords[Math.floor(Math.random() * randomWords.length)];
            const verb = verbs[Math.floor(Math.random() * verbs.length)];
            const object = randomWords[Math.floor(Math.random() * randomWords.length)];
            const subject2 = randomWords[Math.floor(Math.random() * randomWords.length)];
            const verb2 = verbs[Math.floor(Math.random() * verbs.length)];
            const object2 = randomWords[Math.floor(Math.random() * randomWords.length)];
            return `${subject}-${verb}-${object}-${subject2}-${verb2}-${object2}`;
        };

        for (let i = 0; i < copyCount; i++) {
            let img = sharp(imageBuffer);

            // Apply subtle, random modifications
            const contrast = 0.85 + Math.random() * 0.3; // Random contrast between 0.85 and 1.15
            const brightness = 0.9 + Math.random() * 0.2; // Random brightness between 0.9 and 1.1
            const saturation = 1 + Math.random() * 0.3; // Random saturation between 1 and 1.3
            const sharpness = Math.random() * 1; // Random sharpness between 0 and 1

            // Apply minor resize (±7% of original size)
            const newWidth = Math.round(width * (0.93 + Math.random() * 0.1));
            const newHeight = Math.round(height * (0.93 + Math.random() * 0.1));

            img = img
                .resize(newWidth, newHeight)
                .modulate({ brightness, saturation })
                .linear(contrast, 0) // Adjust contrast
                .sharpen(sharpness);

            // Generate a unique filename using UUID
            const filename = `${generateRandomSentence()}${uuidv4()}.jpg`;

            // Convert to JPEG and store as base64
            const modifiedBuffer = await img.jpeg().toBuffer();
            const base64 = `data:image/jpeg;base64,${modifiedBuffer.toString('base64')}`;

            // Add the base64 data along with the filename to the response
            variations.push({ filename, base64 });
        }
        // create a new record in the database
        await prisma.spooferRequest.create({
            data: {
                requestedSpoofedImage: parseInt(copyCount),
                clientIp: ip,
            }
        });
        return { images: variations };
    } catch (error) {
        console.error('Image processing error:', error);
        throw new Error('Image processing failed');
    }
};