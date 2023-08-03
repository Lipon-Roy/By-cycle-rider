const { check, validationResult } = require('express-validator');

const loginValidators = [
    check('email')
        .trim()
        .isEmail()
        .withMessage('Invalid Email'),
    check('password')
        .isLength({ min: 1 })
        .withMessage('Password is required')
];

const loginValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length == 0) next();
    else {
        res.status(400).json({
            errors: mappedErrors
        })
    }
}

module.exports = {
    loginValidators,
    loginValidationHandler
}