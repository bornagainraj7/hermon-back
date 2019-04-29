const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let eventSchema = new Schema({
    eventId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    Start: {
        type: Date,
        required: true
    },
    StartTime: {
        type: String,
        required: true
    },
    end: {
        type: String,
        default: ''
    },
    endTime: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        required: true
    },
    modifiedOn: {
        type: Date,
        default: ''
    },
    creatorId: {
        type: String,
        required: true
    }, 
    creatorName: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Event', eventSchema);