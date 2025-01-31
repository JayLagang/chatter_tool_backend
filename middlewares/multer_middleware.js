const multer = require('multer');
const ErrorResponse = require('../utils/error_response');
const upload = require('../config/multer_config');

const parseMiddleware = (req, res, next) => {
	console.log('Request received in route handler');

	upload.fields([
		{ name: 'image_file', maxCount: 1 }
	])(req, res, (err) => {
		if (err) {
			console.error('Multer error:', err);
			if (err instanceof multer.MulterError) {
				if (err.code === 'LIMIT_FILE_SIZE') {
					return next(new ErrorResponse('File size is too large. Max size is 5MB.', 400));
				}
				return next(new ErrorResponse(`Upload error: ${err.message}`, 400));
			}
			return next(err);
		}

		console.log('Files processed by Multer:', req.files ? 'Files present' : 'No files');

		if (!req.files) {
			return next(new ErrorResponse('Please upload files', 400));
		}

		next();
	});
};

module.exports = parseMiddleware;