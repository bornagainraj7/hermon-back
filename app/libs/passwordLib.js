const bcrypt = require('bcryptjs');
const logger = require('./loggerLib');
const saltRounds = 7;


let hashPassword = (plainText) => {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(plainText, salt);
    return hash;
}

let comparePassword = (plainPassword, hashPassword, cb) => {
    bcrypt.compare(plainPassword, hashPassword, (err, res) => {
        if (err) {
            logger.error(`${err}`, "PasswordLib: comparePassword()", "med");
            cb(err, null);
        } else if(res === true) {
            // logger.info("Password match successfully", "PasswordLib: comparePassword()", "successful");
            cb(null, res);
        } else if(res === false) {
            logger.error(`Password didn't match`, "PasswordLib: comparePassword()", "med");
            cb(null, res);
        }
    });

};



module.exports = {
    hashPassword: hashPassword,
    comparePassword: comparePassword,
}