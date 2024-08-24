const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        assignedAstrologer: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Astrologer'
        }
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
