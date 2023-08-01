const express = require('express');
const { contact, getCycle, booking } = require('../controllers/cycleController');

const router = express.Router();

router.post('/search', getCycle);

router.post('/booking', booking);

router.post('/contact', contact);

module.exports = router;