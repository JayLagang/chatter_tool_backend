const multer = require('multer');
const ErrorResponse = require('../utils/error_response');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	console.log('Multer processing file:', file.originalname);

	const allowedMimeTypes = [
		'application/pdf',
		'application/msword',
		'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'text/plain',
		'image/jpeg',
		'image/png',
	];

	if (allowedMimeTypes.includes(file.mimetype)) {
		cb(null, true);
	} else {
		cb(
			new ErrorResponse(
				'Invalid file type. Allowed types are PDF, Word documents, plain text, and images (JPEG, PNG).',
				400
			),
			false
		);
	}
};
// file size limit is 40MB
const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: 40 * 1024 * 1024,
	},
});

module.exports = upload;