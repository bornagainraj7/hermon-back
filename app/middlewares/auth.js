const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib');
const response = require('./../libs/responseLib');
const tokenLib = require('./../libs/tokenLib');

const AuthModel = require('./../models/authModel');

let isAuthorized = (req, res, next) => {
    let authToken = req.query.authToken || req.params.authToken || req.body.authToken || req.header('authToken');

    if(authToken) {
        AuthModel.findOne({authToken: authToken})
        .then((authDetails) => {
            if(check.isEmpty(authDetails)) {
                logger.error("No auth present", "AuthMiddleware: isAuthorized()", "low");
                let apiResponse = response.generate(true, "Invalid or expired authorisation key", 401, null);
                res.send(apiResponse);
            } else {
                tokenLib.verifyToken(authToken, authDetails.tokenSecret, (err, decoded) => {
                    if(err) {
                        logger.error(`${err}`, "AuthMiddleware: isAuthorized()", "med");
                        let apiResponse = response.generate(true, "Failed to authorise", 401, null);
                        res.send(apiResponse);
                    } else {
                        req.user = {
                            userId: decoded.userId,
                            fullName: decoded.fullName,
                            email: decoded.email,
                            mobileNumber: decoded.mobileNumber,
                            username: decoded.username,
                            isAdmin: decoded.isAdmin
                        };
                        next();
                    }
                });
            }
        })
        .catch((err) => {
            logger.error(`${err}`, "AuthMiddleware: isAuthorized()", "high");
            let apiResponse = response.generate(true, "Failed to authorise", 401, null);
            res.send(apiResponse);
        });
    } else {
        logger.error("Authtorization token missing", "AuthMiddleware: isAuthorized()", "low");
        let apiResponse = response.generate(true, "Authorization token is missing", 400, null);
        res.send(apiResponse);
    }
}

let isAdmin = (req, res, next) => {
    let authToken = req.query.authToken || req.params.authToken || req.body.authToken || req.header('authToken');
    if(authToken) {
        let isAdmin = req.user.isAdmin;
        if(isAdmin) {
            next();
        } else {
            logger.error("User not an admin", "AuthMiddleware: isAdmin()", "low");
            let apiResponse = response.generate(true, "API not available as this is an admin link, accessible only by admin", 400, null);
            res.send(apiResponse);
        }

    } else {
        logger.error("Authtorization token missing", "AuthMiddleware: isAdmin()", "low");
        let apiResponse = response.generate(true, "Authorization token is missing", 400, null);
        res.send(apiResponse);
    }
}

module.exports = {
    isAuthorized: isAuthorized,
    isAdmin: isAdmin
}