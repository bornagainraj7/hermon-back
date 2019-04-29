const bcrypt = require('bcrypt');
const logger = require('./loggerLib');
const saltRounds = 7;


let hashPassword = (plainText) => {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(plainText, salt);
    return hash;
}

let comparePassword = (password, hashPassword, callback) => {
    bcrypt.compare(password, hashPassword, (err, res) => {
        if(err) {
            logger.error(`${err}`, "PasswordLib: comparePassword()", "med");
            callback(err, null);
        } else {
            logger.info("Password Match!", "PasswordLib: comparePassword()","successful");
            callback(null. res);
        }
    });
}

module.exports = {
    hashPassword: hashPassword,
    comparePassword: comparePassword
}