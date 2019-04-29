const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let AuthModel = new Schema({
    authId: {
        type: String,
        required: true,
        index: true
    },
    userId: {
        type: String,
        required: true
    },
    authToken: {
        type: String,
        required: true
    },
    tokenSecret: {
        type: String,
        default: ''
    },
    generatedOn: {
        type: Date,
        default: new Date()
    }
});


module.exports = mongoose.model('Auth', AuthModel);