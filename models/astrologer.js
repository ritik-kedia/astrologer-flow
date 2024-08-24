const mongoose = require('mongoose');

const astrologerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        isTopAstrologer: {
            type: Boolean,
            default: false
        },
        currentLoad: {
            type: Number,
            default: 0
        }
    }
);


const Astrologer = mongoose.model('Astrologer', astrologerSchema);

module.exports = Astrologer;
