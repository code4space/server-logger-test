const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});

const Loggers = mongoose.model('Loggers', schema);
module.exports = Loggers