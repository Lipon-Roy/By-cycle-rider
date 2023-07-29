const mongoose = require('mongoose');

const cycleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
        },
        position: {
            type: String,
            enum: ['science', 'bba', 'second', 'undefined'],
            default: 'undefined'
        }
    }
);

const Cycle = mongoose.model('Cycles', cycleSchema);

module.exports = Cycle;