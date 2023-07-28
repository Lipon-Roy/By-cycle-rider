const express = require('express');
const cycleController = require('../controllers/cycleController');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello By cycle Rider");
});

router.post('/', cycleController);

module.exports = router;