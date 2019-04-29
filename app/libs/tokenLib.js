const jwt = require('jsonwebtoken');
const shortId = require('shortid');
const secretKey = '8)m3Ve12y1r4nd0mP455w012d'; //someveryrandomPassword
const logger = require('./loggerLib');


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
            isAdmin: data.isAdmin
        } 
        
        let expiry = {
            expiresIn: '24h'
        }

        let tokenDetails = {
            authToken: jwt.sign(claims, secretKey, expiry),
            tokenSecret: secretKey
        }

        callback(null, tokenDetails);

    } catch (err) {
        callback(err, null);
    }
}

let verifyToken = (token, secretKey, callback) => {
    jwt.verify(token, secretKey, (err, decoded) => {
        if(err) {
            logger.error(`${err}`, "TokenLib: verifyToken()", "med");
            callback(err, null);
        } else {
            callback(null, decoded);
        }
    })
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken
}