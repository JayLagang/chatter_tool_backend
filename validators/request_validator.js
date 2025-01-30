const { validationResult} = require('express-validator');

class RequestValidator {
    validate() {
        return (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Validation error',
                    errors: errors.array()
                 });
            }
            next();
        }
    }
}

module.exports = new RequestValidator();