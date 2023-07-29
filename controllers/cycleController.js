const calculator = require("../utilities/calculator");
const createError = require('http-errors');
const Cycle = require('../models/Cycle');

const getCycle = async (req, res, next) => {
    try {
        const posi = req.body.position;
        const cycles = await Cycle.find({position: posi});
        res.status(200).json({cycles});
    } catch(err) {
        next(createError(err.message));
    }
}

const addCycle = (req, res, next) => {
    const lat = Number(req.body.latitude);
    const lon = Number(req.body.longitude);

    const distance = calculator(lat,lon);

    res.send({
        distance
    })
}

module.exports = {
    addCycle,
    getCycle,
}