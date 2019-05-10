const jwt = require('jsonwebtoken');
const shortId = require('shortid');
const secretKey = '8)m3Ve12y1r4nd0mP455w012d'; //someveryrandomPassword
const logger = require('./loggerLib');
const check  = require('./checkLib');

const AuthModel = require('./../models/authModel');

// generate new token
let generateToken = (data, callback) => {
    try{
        let claims = {
            jwtId: shortId.generate(),
            issuedAt: Date.now(),
            sub: 'authToken',
            userId: data.userId,
            email: data.email,
            fullName: data.fullName,
            mobileNumber: data.mobileNumber,
            username: data.username,
            isAdmin: data.isAdmin
        } 
        
        const expiry = {
            expiresIn: '24h'
        }

        const tokenDetails = {
            authToken: jwt.sign(claims, secretKey, expiry),
            tokenSecret: secretKey
        }

        callback(null, tokenDetails);

    } catch (err) {
        logger.error(`${err}`, "tokenLib: generateToken()", "high");
        callback(err, null);
    }
}

// verify token
let verifyToken = (token, secretKey, callback) => {
    jwt.verify(token, secretKey, (err, decoded) => {
        if(err) {
            logger.error(`${err}`, "TokenLib: verifyToken()", "med");
            callback(err, null);
        } else {
            callback(null, decoded);
        }
    });
}

// save token
let saveToken = (tokenDetails, callback) => {
    AuthModel.findOne({userId: tokenDetails.userId})
    .then((result) => {
        if(check.isEmpty(result)) {

            let newAuthToken = AuthModel({
                authId: shortId.generate(),
                userId: tokenDetails.userId,
                authToken: tokenDetails.authToken,
                tokenSecret: tokenDetails.tokenSecret,
                generatedOn: new Date()
            });

            newAuthToken.save()
            .then((savedToken) => {
                let response = {
                    authToken: savedToken.authToken,
                    userId: savedToken.userId,
                    expiresIn: tokenDetails.expiresIn,
                    userDetails: tokenDetails.userDetails
                };
                callback(null, response);
            })
            .catch((err) => {
                logger.error(`${err}`, "tokenLib: saveToken(): newToken", "high");
                callback(err, null);
            });
        } else {
            result.authToken = tokenDetails.authToken;
            result.tokenSecret = tokenDetails.tokenSecret;
            result.generatedOn = new Date();

            result.save()
            .then((savedToken) => {
                let response = {
                    authToken: savedToken.authToken,
                    userId: savedToken.userId,
                    expiresIn: tokenDetails.expiresIn,
                    userDetails: tokenDetails.userDetails
                };
                callback(null, response);
            })
            .catch((err) => {
                logger.error(`${err}`, "tokenLib: saveToken(): updateToken", "high");
                callback(err, null);
            });
        }
    })
    .catch((error) => {
        logger.error(`${error}`, "tokenLib: saveToken()", "high");
        callback(error, null);
    });
}

let verifyWithoutSecret = (token, callback) => {
    jwt.verify(token, secretKey, (err, decoded) => {
        if(err) {
            logger.error(`${err}`, "TokenLib: verifyWithoutSecret()", "med");
            callback(err, null);
        } else {
            callback(null, decoded);
        }
    });
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
    saveToken: saveToken,
    verifyWithoutSecret: verifyWithoutSecret
}