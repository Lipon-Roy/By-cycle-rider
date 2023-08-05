const express = require('express');
const { contact, getCycle, booking, getSingleCycle } = require('../controllers/cycleController');
const checkLogin = require('../middlewares/common/checkLogin');

const router = express.Router();

router.get('/:id', checkLogin, getSingleCycle);

router.post('/search', checkLogin, getCycle);

router.post('/booking', checkLogin, booking);

router.post('/contact', contact);

module.exports = router;