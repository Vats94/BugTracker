const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bugSchema = new Schema({
    username: { type: String, required: true },
    bugTitle: { type: String, required: true},
    bugDescription: { type: String, required: true},
    dateAssigned: { type: Date, required: true},
    dateFinished: {type: Date, required: false},
}, {
    timestamps: true,
});

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;