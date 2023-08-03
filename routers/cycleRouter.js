const express = require('express');
const { contact, getCycle, booking } = require('../controllers/cycleController');
const checkLogin = require('../middlewares/common/checkLogin');

const router = express.Router();

router.post('/search', checkLogin, getCycle);

router.post('/booking', checkLogin, booking);

router.post('/contact', contact);

module.exports = router;