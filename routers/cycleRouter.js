const express = require('express');
const cycleController = require('../controllers/cycleController');

const router = express.Router();

router.post('/', cycleController);

module.exports = router;