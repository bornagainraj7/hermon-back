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
    start: {
        type: Date,
        required: true
    },
    startTime: {
        type: Object,
        required: true
    },
    end: {
        type: Date,
        default: ''
    },
    endTime: {
        type: Object,
        default: ''
    },
    creatorId: {
        type: String,
        required: true
    }, 
    creatorName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: '#1d71c5'
    },
    createdOn: {
        type: Date,
        required: true
    },
    modifiedOn: {
        type: Date,
        default: ''
    }
});


module.exports = mongoose.model('Event', eventSchema);