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
            enum: ['science', 'bba', 'first', 'second', 'undefined'],
            default: 'undefined'
        },
        available: {
            type: Boolean,
            default: true,
        },
        bookAt: {
            type: Date,
            default: Date.now
        },
        availableAt: {
            type: Date,
            default: Date.now,
        }
    }
);

const Cycle = mongoose.model('Cycles', cycleSchema);

module.exports = Cycle;