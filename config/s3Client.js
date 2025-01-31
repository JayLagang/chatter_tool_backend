require('dotenv').config();
const {S3Client} = require('@aws-sdk/client-s3');

const newS3Client = new S3Client({
	region: process.env.AWS_BUCKET_REGION, // Replace with your AWS region
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY, // Replace with your Access Key ID
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Replace with your Secret Access Key
	},
});

module.exports = {newS3Client};