const UserModel = require('./../models/userModel');
const EventModel = require('./../models/eventModel');
const check = require('./checkLib');
const logger = require('./loggerLib');


let ifUserExists = (email, callback) => {
    UserModel.findOne({ email: email})
    .then((result) => {
        if(check.isEmpty(result)) {
            callback(null, false);
        } else {
            callback(null, true);
        }
    })
    .catch((err) => {
        logger.error(`${err}`, "Verify Lib: ifUserExists()", "high");
        callback(err, null);
    });
}


let findUser = (email, callback) => {
    UserModel.findOne({ email: email })
    .then((result) => {
        if(check.isEmpty(result)) {
            callback(null, result);
        } else {
            callback(null, result);
        }
    })
    .catch((err) => {
        logger.error(`${err}`, "Verify Lib: findUser()", "high");
        callback(err, null);
    });
}


let findUserById = (userId, callback) => {
    UserModel.findOne({ userId: userId })
        .then((result) => {
            if (check.isEmpty(result)) {
                callback(null, result);
            } else {
                callback(null, result);
            }
        })
        .catch((err) => {
            logger.error(`${err}`, "Verify Lib: findUser()", "high");
            callback(err, null);
        });
}


let verifyInput = (param) => {
    if(check.isEmpty(param)) {
        return false;
    } else {
        return true;
    }
}




module.exports = {
    ifUserExists: ifUserExists,
    findUser: findUser,
    findUserById,
    verifyInput: verifyInput
}