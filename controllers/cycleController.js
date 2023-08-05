const calculator = require("../utilities/calculator");
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const Cycle = require('../models/Cycle');

//all cycles are expired at october 30/ata abar mone thakbe na tai likhe rakhlam/
const getSingleCycle = async (req, res, next) => {
    try {
        const cycle = await Cycle.findOne({
            _id: req.params.id
        }).select({
            name: 1,
            price: 1
        });

        res.status(200).json({ cycle });
    } catch(err) {
        res.status(500).json({
            msg: createError(err.message),
        });
    }
}

const getCycle = async (req, res, next) => {
    try {
        const posi = req.body.position;
        const cycles = await Cycle.find({
            position: posi,
            available: true,
        }).select({
            name: 1,
            price: 1
        });
        // const cycles = await Cycle.findOne({_id: req.params.search});
        res.status(200).json({cycles});
    } catch (err) {
        next(createError(err.message));
    }
}

const booking = async (req, res, next) => {
    /*
        body = { _id: cycleId, time:for how long want to booking and time must be milisecond }
    */
    try {
        await Cycle.updateOne({_id: req.body.id}, {
            $set: {
                available: false,
                bookAt: Date.now(),
                availableAt: Date.now() + (req.body.time * 1000)
            }
        });
        // generate a pin number//just for fun
        res.status(200).json({pinLock: 1234});
    } catch(err) {
        next(createError(err.message));
    }
}

// gps tracker always hit this route controller
const contact = async (req, res, next) => {
    try {
        const { identity } = req.headers;
        const cur_posi = req.body;

        const token = identity.split(' ')[1];
        const decoded = jwt.verify(token, process.env.CYCLE_JWT_SECRET);
        const { cycleName, cycleId } = decoded;

        const place = calculator(cur_posi.lat, cur_posi.lon);

        if (place == 'undefined') {
            await Cycle.updateOne(
                { _id: cycleId },
                {
                    $set: {
                        position: "undefined",
                        available: false
                    }
                }
            );
        } else {
            const cycle = await Cycle.findByIdAndUpdate(
                { _id: cycleId },
                {
                    $set: {
                        position: place,
                    },
                }
            );
            if (Date.now() > cycle.availableAt) {
                await Cycle.updateOne({_id: cycleId}, {
                    $set: {
                        available: true,
                        bookAt: Date.now(),
                        availableAt: Date.now()
                    }
                });
            }
            
        }
        res.status(200).json({ msg: 'going well' });
    } catch (err) {
        next(createError(err.message + " for testting"));
    }
}

module.exports = {
    contact,
    getCycle,
    getSingleCycle,
    booking,
}

// const addCycle = async (req, res, next) => {
//     try {
//         await Cycle.insertMany([
//             {
//                 name: "Ranger",
//                 position: "science",
//                 price: 20,
//                 available: true
//             },
//             {
//                 name: "Hero",
//                 position: "science",
//                 price: 22,
//                 available: true
//             },
//             {
//                 name: "Bianchi",
//                 position: "second",
//                 price: 25,
//                 available: true
//             },
//             {
//                 name: "Giant Bicycles",
//                 position: "science",
//                 price: 32,
//                 available: true
//             },
//             {
//                 name: "Diamondback Bike",
//                 position: "first",
//                 price: 29,
//                 available: true
//             },
//             {
//                 name: "Camp Bicycle",
//                 position: "first",
//                 price: 24,
//                 available: true
//             },
//             {
//                 name: "Avon Cycles",
//                 position: "first",
//                 price: 27,
//                 available: true
//             },
//             {
//                 name: "Veloce Bike",
//                 position: "bba",
//                 price: 35,
//                 available: true
//             },
//             {
//                 name: "Duronto",
//                 position: "bba",
//                 price: 35,
//                 available: true
//             },
//             {
//                 name: "Phoenix",
//                 position: "bba",
//                 price: 40,
//                 available: true
//             },
//         ]);
//         res.status(200).json({msg: 'successfull'});
//     } catch (err) {
//         next(createError(err.message));
//     }
// }