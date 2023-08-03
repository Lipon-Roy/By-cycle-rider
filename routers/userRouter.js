const express = require('express');
const { signup, getUser } = require('../controllers/userController');
const { addUserValidators, addUserValidationHandler } = require('../middlewares/users/userValidators');
const checkLogin = require('../middlewares/common/checkLogin');

const router = express.Router();

router.get('/', checkLogin, getUser);

// signup user
router.post('/signup', addUserValidators, addUserValidationHandler, signup);

module.exports = router;