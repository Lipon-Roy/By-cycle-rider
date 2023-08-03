const express = require('express');
const { signup, getUser } = require('../controllers/userController');
const { addUserValidators, addUserValidationHandler } = require('../middlewares/users/userValidators');

const router = express.Router();

router.get('/', getUser);

// signup user
router.post('/signup', addUserValidators, addUserValidationHandler, signup);

module.exports = router;