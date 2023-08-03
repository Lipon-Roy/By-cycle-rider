const express = require('express');
const { login } = require('../controllers/loginController');
const { loginValidators, loginValidationHandler } = require('../middlewares/login/loginValidators');

const router = express.Router();

router.post('/', loginValidators, loginValidationHandler, login);

module.exports = router;