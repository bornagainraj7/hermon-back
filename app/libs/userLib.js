const UserModel = require('../models/userModel');
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
        logger.error(`${err}`, "User Lib: ifUserExists()", "high");
        callback(err, null);
    });
}


let findUser = (email, callback) => {
    UserModel.findOne({ email: email }).select('-__v -id').lean()
    .then((result) => {
        callback(null, result);
    })
    .catch((err) => {
        logger.error(`${err}`, "User Lib: findUser()", "high");
        callback(err, null);
    });
}


let findUserById = (userId, callback) => {
    UserModel.findOne({ userId: userId }).select('-__v -id').lean()
    .then((result) => {
        callback(null, result);
    })
    .catch((err) => {
        logger.error(`${err}`, "User Lib: findUserById()", "high");
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
