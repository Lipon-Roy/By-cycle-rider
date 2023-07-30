const express = require('express');
const { addCycle, getCycle } = require('../controllers/cycleController');

const router = express.Router();

router.post('/search', getCycle);

router.post('/', addCycle);

module.exports = router;