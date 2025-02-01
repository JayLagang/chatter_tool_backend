require('dotenv').config();
const { newS3Client } = require('../config/s3Client');
const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const bucketName = process.env.AWS_BUCKET_NAME;
const ErrorResponse = require('./error_response');
const prisma = require('../config/database');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const sharp = require('sharp');

//asynchronous function that processes a single file upload using the multer middleware.
const singleFileUploadHandler = async (fieldName, req, res) => {
	if (!req || !res) {
		throw new ErrorResponse('request or response objects undefined', 500);
	}

	return new Promise((resolve, reject) => {
		upload.single(fieldName)(req, res, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(req.file);
			}
		});
	});
};

// function to handle multiple file uploads on a single field
const multipleFileUploadHandler = async (fieldName, req, res) => {
	if (!req || !res) {
		throw new ErrorResponse('request or response objects undefined', 500);
	}

	return new Promise((resolve, reject) => {
		upload.array(fieldName)(req, res, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(req.files);
			}
		});
	});
}


const multipleFieldsUploadMiddleware = async (req, res, next) => {
    if (!req || !res) {
        return next(new ErrorResponse('request or response objects undefined', 500));
    }

    return new Promise((resolve, reject) => {
        const uploadFields = upload.fields([
            { name: 'avatar', maxCount: 1 },  // Handling single file field (avatar)
            { name: 'acceptedVisits[]' },    // Handling array fields
            { name: 'addressOne' },
            { name: 'addressTwo' },
            { name: 'city' },
            { name: 'state' },
            { name: 'zipCode' },
            { name: 'npiNumber' },
            { name: 'providerEmail' },
            { name: 'providerPhone' },
            { name: 'providerExt' },
            { name: 'providerFax' },
            { name: 'providerFirstName' },
            { name: 'providerLastName' },
            { name: 'providerGender' },
            { name: 'specialty' },
            { name: 'profileType' },
            { name: 'professionalSuffixes' },
            { name: 'educations[0][institutionName]' },
            { name: 'educations[0][degree]' },
            { name: 'adminstrativeFirstName' },
            { name: 'administrativeLastName' },
            { name: 'administrativeJobTitle' },
            { name: 'administrativeEmail' },
            { name: 'administrativePhone' }
        ]);

        uploadFields(req, res, (err) => {
            if (err) {
                return reject(next(err));  // Passing error to the next middleware
            } else {
                const files = req.files;   // All files (e.g., avatar)
                let body = req.body;       // All text fields

                // Parsing specific fields as integers or arrays of integers
                if (body.providerGender) {
                    body.providerGender = parseInt(body.providerGender, 10); // Ensure integer
                }
                if (body.profileType) {
                    body.profileType = parseInt(body.profileType, 10); // Ensure integer
                }
                if (body.specialties) {
                    body.specialties = JSON.parse(body.specialties).map(Number); // Ensure array of integers
                }
                if (body.professionalSuffixes) {
                    body.professionalSuffixes = JSON.parse(body.professionalSuffixes).map(Number); // Ensure array of integers
                }

                req.body = body; // Overriding req.body with the parsed data
                req.files = files; // Overriding req.files with the uploaded files

                resolve();
            }
        });
    }).then(() => next()).catch(next);  // Call next() after resolving, or pass error to next
};




const uploadFileUtil = async (req) => {
	const {file, folder, fileSizeLimit} = req.uploadFileParams;
	const convertedFileSizeLimit = fileSizeLimit * 1024 * 1024;
	const uploadFileSize = file.size;

	const availableFolders = ['sender-sent-pictures', 'model_sample_pictures'];

	if (!availableFolders.includes(folder)) {
		console.error('Invalid folder name provided');
		return null;
	}

	if (!file) {
		console.error('No file provided');
		return null;
	}

	// fileSizeLimit passed on the parameter should be in MB.
	if (!fileSizeLimit) {
		console.error('File size limit not provided');
		return null;
	}

	// Throw an error if the value is not a valid number
	if (isNaN(fileSizeLimit)) {
		console.error('Invalid file size limit value');
		return null;
	}

	if (uploadFileSize > convertedFileSizeLimit) {
		console.error('File size limit exceeded');
		return null;
	}

	// Resize the image
	let resizedBuffer = file.buffer;

	if(folder == 'sender-sent-pictures'){
		try {
			resizedBuffer = await sharp(resizedBuffer)
			  .resize({ width: 300, height: 300, fit: 'cover' }) // Maintain aspect ratio
			  .toBuffer();
		  } catch (error) {
			console.error('Error resizing image:', error);
			return null;
		  }
	}

	if(folder == 'model_sample_pictures'){
			try {
				resizedBuffer = await sharp(resizedBuffer)
				.resize({ width: 300, height: 300, fit: 'cover' }) // Maintain aspect ratio
				.toBuffer();
			} catch (error) {
				console.error('Error resizing image:', error);
				return null;
			}
	}

	const params = {
		Bucket: bucketName || process.env.AWS_BUCKET_NAME,
		Key: `${folder}/${uuidv4()}-${file.originalname}`,
		Body: resizedBuffer,
		ContentType: file.mimetype,
	};
	
	const putObjectCommand = new PutObjectCommand(params);
	await newS3Client.send(putObjectCommand);
	const objectUrl = generatePublicUrl(bucketName, params.Key);

	return {
		newObjectKey: params.Key,
		newObjectUrl: objectUrl,
	};
};

const retrieveOldAvatarKey = async (userId) => {
	const avatarKey = await prisma.userProfile.findUnique({
		where: {
			userId,
		},
		select: {
			avatarObjectKey: true,
		},
	});

	if (!avatarKey.avatarObjectKey) {
		return null;
	}
	return avatarKey;
};
const retrieveProvidersOldAvatarKey = async (providerProfileId) => {
	const avatarKey = await prisma.providerProfile.findUnique({
		where: {
			id:providerProfileId,
		},
		select: {
			avatarObjectKey: true,
		},
	});

	if (!avatarKey.avatarObjectKey) {
		return null;
	}
	return avatarKey;
};
const retrieveProvidersOldIntroductionVideoKey = async (providerProfileId) => {
	const introductionVideoKey = await prisma.providerProfile.findUnique({
		where: {
			id:providerProfileId,
		},
		select: {
			introductionVideoObjectKey: true,
		},
	});

	if (!introductionVideoKey.introductionVideoObjectKey) {
		return null;
	}
	return introductionVideoKey;
}
const retrieveOldSignatureKey = async (providerProfileId) => {
	const signatureKey = await prisma.providerProfile.findUnique({
		where: {
			id:providerProfileId,
		},
		select: {
			signatureObjectKey: true,
		},
	});

	if (!signatureKey.signatureObjectKey) {
		return null;
	}
	return signatureKey;
};
const deleteObject = async (key) => {
	const params = {
		Bucket: bucketName || process.env.AWS_BUCKET_NAME,
		Key: key,
	};

	try {
		const deleteObjectCommand = new DeleteObjectCommand(params);
		const result = await newS3Client.send(deleteObjectCommand);
		return result;
	} catch (err) {
		return null;
	}
};

const generateTemporaryUrl = async (bucket, avatarKey) => {
	const params = {
		Bucket: bucket || process.env.AWS_BUCKET_NAME,
		Key: avatarKey,
	};
	try {
		const getObjectCommand = new GetObjectCommand(params);
		const signedUrl = await getSignedUrl(newS3Client, getObjectCommand, { expiresIn: 3600 });
		return signedUrl;
	} catch (err) {
		console.log(err);
		throw new ErrorResponse('Error generating temporary URL', 500);
	}
};

const generateUrl = async (bucket, avatarKey) => {
	const params = {
		Bucket: bucket || process.env.AWS_BUCKET_NAME,
		Key: avatarKey,
	};
	try {
		const getObjectCommand = new GetObjectCommand(params);
		const signedUrl = await getSignedUrl(newS3Client, getObjectCommand);
		return signedUrl;
	} catch (err) {
		console.log(err);
		throw new ErrorResponse('Error generating temporary URL', 500);
	}
};

const generatePublicUrl = (bucket, avatarKey) => {
	return `https://${bucket}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${avatarKey}`;
  };

module.exports = {
	uploadFileUtil,
	singleFileUploadHandler,
	deleteObject,
	retrieveOldAvatarKey,
	generateTemporaryUrl,
	retrieveProvidersOldAvatarKey,
	multipleFieldsUploadMiddleware,
	retrieveProvidersOldIntroductionVideoKey,
	retrieveOldSignatureKey,
	multipleFileUploadHandler
};
