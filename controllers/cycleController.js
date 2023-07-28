const calculator = require("../utilities/calculator");

const cycleController = (req, res, next) => {
    const lat = Number(req.body.latitude);
    const lon = Number(req.body.longitude);

    const distance = calculator(lat,lon);

    res.send({
        distance
    })
}

module.exports = cycleController