const shortId = require('shortid');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib');
const validateInput = require('./../libs/paramsValidationLib');
const passwordLib = require('./../libs/passwordLib');
const tokenLib = require('./../libs/tokenLib');
const time = require('./../libs/timeLib');
const verify = require('./../libs/verifyLib');

const UserModel = require('./../models/userModel');
const EventModel = require('./../models/eventModel');
const AuthModel = require('./../models/authModel');

// signup function
let signUpUser = (req, res) => {
    let username;
    let email = req.body.email.toLowerCase();
    let password = passwordLib.hashPassword(req.body.password);

    if(req.body.isAdmin == 'true') {
        username = check.trim(req.body.username) + "-admin";
        username.toLowerCase();
    } else {
        username = check.trim(req.body.username) + "-user";
        username.toLowerCase();
    }
    

    let newUser = new UserModel({
        userId: shortId.generate(),
        firstName: req.body.firstName,
        lastName: req.body.lastName || '',
        fullName: `${req.body.firstName} ${req.body.lastName}`,
        username: username,
        email: email,
        password: password,
        country: req.body.country,
        mobileNumber: `${req.body.telcode}-${req.body.mobileNumber}`,
        isAdmin: req.body.isAdmin
    });


    let ifUserExists = () => {
        return new Promise((resolve, reject) => {
            // validating params/inputs
            if(!req.body.email) {
                logger.error("Missing fields", "UserController: SignUpUser(): ifUserExists()", "med");
                let apiResponse = response.generate(true, "One or more parameter(s) missing", 500, null);
                reject(apiResponse);
            } else {
                if(!validateInput.email(req.body.email)) {
                    logger.error("Email doesn't match the required parameters", "UserController: singUpUser(): ifUserExists", "low");
                    let apiResponse = response.generate(true, "Email doesn't match the required parameters", 401, null);
                    reject(apiResponse);
                } else if(!validateInput.password(req.body.password)) {
                    logger.error("Password doesn't match the required parameter", "UserController: SignUpUser(): ifUserExists()", "low");
                    let apiResponse = response.generate(true, "Password doesn't match the required parameter", 401, null);
                    reject(apiResponse);
                } else {

                    // searching for user
                    verify.ifUserExists(req.body.email, (err, result) => {
                        console.log("In method");
                        if(err) {
                            logger.error(`${err}`, "UserController: SignUpUser(): ifUserExists()", "high");
                            let apiResponse = response.generate(true, "Error while checking user email", 500, null);
                            reject(apiResponse);
                        } else if(result) {
                            logger.error("User with same email already exists", "UserController: SignUpUser(): ifUserExists()", "med");
                            let apiResponse = response.generate(true, "User with same email already exists", 404, null);
                            reject(apiResponse);
                        } else {
                            resolve(req);
                        }
                    });

                }
            }

        });
    }

    // creating user
    let createUser = () => {
        return new Promise((resolve, reject) => {
            newUser.save()
            .then((result) => {
                let newUserObj = result.toObject({ getters: true });

                delete newUserObj.password;
                delete newUserObj._id;
                delete newUserObj.__v;

                resolve(newUserObj);
            })
            .catch((err) => {
                logger.error(`${err}`, "UserController: SignUpUser(): createUser()", "high");
                let apiResponse = response.generate(true, "Error occurred while creating user", 503, null);
                reject(apiResponse);
            })
        });
    }

    // generating token
    let generateToken = (userObj) => {
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userObj, (err, tokenDetails) => {
                if(err) {
                    logger.error(`${err}`, "UserController: SignUpUser(): generateToken()", "high");
                    let apiResponse = response.generate(true, "Failed to generate Token", 500, null);
                    reject(apiResponse);
                } else {
                    logger.info("Token generated successfully", "UserController: SignUpUser(): generateToken()", "successful");

                    delete userObj.id;

                    tokenDetails.userId = userObj.userId;
                    tokenDetails.expiresIn = 86395;
                    tokenDetails.userDetails = userObj;

                    resolve(tokenDetails);
                }
            });
        });
    }

    // save token function
    let saveToken = (token) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: token.userId })
            .then((result) => {
                if(check.isEmpty(result)) {
                    // creating new auth entry
                    let newAuthToken = new AuthModel({
                        authId: shortId.generate(),
                        userId: token.userId,
                        authToken: token.authToken,
                        tokenSecret: token.tokenSecret,
                        generatedOn: new Date()
                    });

                    // saving token
                    newAuthToken.save()
                    .then(AuthResult => {
                        let response = {
                            authToken: AuthResult.authToken,
                            userId: token.userId,
                            expiresIn: token.expiresIn,
                            userDetails: token.userDetails
                        }

                        resolve(response);
                    })
                    .catch(error => {
                        logger.error(`${error}`, "UserController: SignUpUser(): saveToken()", "high");
                        let apiResponse = response.generate(true, "Failed to generate token", 500, null);
                        reject(apiResponse);
                    });

                } else {

                    // overwriting existing auth entry
                    result.authToken = token.authToken;
                    result.tokenSecret = token.tokenSecret;
                    result.generatedOn = new Date();

                    result.save()
                    .then(newToken => {
                        let response = {
                            authToken: newToken.authToken,
                            userId: token.userId,
                            expiresIn: token.expiresIn,
                            userDetails: token.userDetails
                        };

                        resolve(response);
                    })
                    .catch(error => {
                        logger.error(`${error}`, "UserController: SignUpUser(): saveToken()", "high");
                        let apiResponse = response.generate(true, "Failed to generate token", 500, null);
                        reject(apiResponse);
                    });
                }
            })
            .catch((err) => {
                logger.error(`${err}`, "UserController: SignUpUser(): saveToken()", "high");
                let apiResponse = response.generate(true, "Failed to generate token", 500, null);
                reject(apiResponse);
            })
        });
    }


    async function execute(req, res) {
        try{
            const verify = await ifUserExists();
            const newUserObj = await createUser();
            const generatedToken = await generateToken(newUserObj);
            const finalResponse = await saveToken(generatedToken);
            
            let apiResponse = response.generate(false, "User created and auth token generated Successfully", 201, finalResponse);
            res.send(apiResponse);
        } catch(error) {
            res.send(error);
        }
    
    }

    execute(req, res); 

}

// login function
let loginUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let validateUser = () => {
        return new Promise((resolve, reject) => {
            verify.findUser(email, (error, result) => {
                if (error) {
                    logger.error(`${error}`, "UserController: loginUser(): validateUser()", "high");
                    let apiResponse = response.generate(true, "Unable to find User", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)) {
                    logger.error("No user found", "", "med");
                    let apiResponse = response.generate(true, "No user found with the provided details", 404, null);
                    reject(apiResponse);
                } else {
                    passwordLib.comparePassword(password, result.password, (err, match) => {
                        if(err) {
                            logger.error(`${err}`, "UserController: loginUser(): validateUser()", "high");
                            let apiResponse = response.generate(true, "Couldn't validate user's password", 401, null);
                            reject(apiResponse);
                        } else if(match) {
                            let userDetailsObj = result.toObject({getters: true});
                            
                            delete userDetailsObj.password;
                            delete userDetailsObj._id;
                            delete userDetailsObj.__v;

                            resolve(userDetailsObj);
                        }
                    });
                }
            });
        });
        
    }

    let generateToken = (userDetails) => {
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userDetails, (err, token) => {
                if(err) {
                    logger.error(`${err}`, "UserController: loginUser(): generateToken()", "high");
                    let apiResponse = response.generate(true, "Couldn't generate token", 500, null);
                    reject(apiResponse);
                } else {
                    logger.info("Token generated successfully", "UserController: loginUser(): generateToken()", "successful");

                    token.userId = userDetails.userId;
                    token.expiresIn = 86395;
                    token.userDetails = userDetails;

                    resolve(token);

                }
            });
        });
    }

    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            AuthModel.findOne({ userId: tokenDetails.userId })
            .then((result) => {
                if(check.isEmpty(result)) {
                    // creating new auth entry
                    let newAuthToken = new AuthModel({
                        authId: shortId.generate(),
                        userId: tokenDetails.userId,
                        authToken: tokenDetails.authToken,
                        tokenSecret: tokenDetails.tokenSecret,
                        generatedOn: new Date()
                    });

                    newAuthToken.save()
                    .then(AuthToken => {
                        let response = {
                            authToken: AuthToken.authToken,
                            userId: tokenDetails.userId,
                            expiresIn: tokenDetails.expiresIn,
                            userDetails: tokenDetails.userDetails
                            
                        }
                        resolve(response);

                    })
                    .catch(err => {
                        logger.error(`${err}`, "UserController: loginUser(): saveToken()", "high");
                        let apiResponse = response.generate(true, "Couldn't initialize auth token for the user", 500, null);
                        reject(apiResponse);
                    });

                } else {

                    result.authToken = tokenDetails.authToken;
                    result.tokenSecret = tokenDetails.tokenSecret;
                    result.generatedOn = new Date();

                    result.save()
                    .then(newToken => {
                        let response = {
                            authToken: newToken.authToken,
                            userId: newToken.userId,
                            expiresIn: tokenDetails.expiresIn,
                            userDetails: tokenDetails.userDetails
                        };

                        resolve(response);
                    })
                    .catch(err => {
                        logger.error(`${err}`, "UserController: loginUser(): saveToken()", "high");
                        let apiResponse = response.generate(true, "Couldn't initialize auth token for the user", 500, null);
                        reject(apiResponse);
                    });

                }
            })
            .catch((err) => {
                logger.error(`${err}`, "UserController: loginUser(): saveToken()", "high");
                let apiResponse = response.generate(true, "Couldn't initialize auth token", 500, null);
                reject(apiResponse);
            });
        });
    }


    async function execute(req, res) {
        try {
            const validate = await validateUser();
            const generatedToken = await generateToken(validate);
            const finalResponse = await saveToken(generatedToken);

            let apiResponse = response.generate(false, "User logged in successfully", 201, finalResponse);
            res.send(apiResponse);

        } catch(error) {
            res.send(error);
        }
    }

    execute(req, res);

}

//edit user function
let editUser = (req, res) => {
    let userId = req.params.userId;
    let options = req.body;

    let input = verify.verifyInput(userId);

    let getUser = () => {
        return new Promise((resolve, reject) => {
            verify.findUserById(userId, (err, result) => {
                if(err) {
                    logger.error(`${err}`, "UserController: editUser(): getUser()", "high");
                    let apiResponse = response.generate(true, "Unable to find the user", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)) {
                    logger.error(`${err}`, "UserController: editUser(): getUser()", "med");
                    let apiResponse = response.generate(true, "User doesn't exists", 404, null);
                    reject(apiResponse);
                } else {
                    logger.info("User found", "UserController: editUser(): getUser()", "successful");
                    resolve();
                }
            });
        });
    }

    let updateUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOneAndUpdate({userId: userId}, options)
            .then((result) => {
                if(result.n > 0) {
                    resolve(result);
                } else {
                    logger.error("No new data found to update user", "UserController: editUser(): updateUser()", "low");
                    let apiResponse = response.generate(true, "No new data found to update user", 404, null);
                    reject(apiResponse);
                }
            })
            .catch((error) => {
                logger.error(`${error}`, "UserController: editUser(): updateUser()", "high");
                let apiResponse = response.generate(true, "Error updating user info", 500, null);
                reject(apiResponse);
            })
        })
    }



    async function execute(req, res) {
        if(input) {
            try {
                await getUser();
                let user = await updateUser();

                let apiResponse = response.generate(false, "User info updated successfully", 201, user);
                res.send(apiResponse);
            } catch(error) {
                res.send(error);
            }
        } else {
            let apiResponse = response.generate(true, "Empty userId string, couldn't locate user", 500, null);
            res.send(apiResponse);
        }
    }

    execute(req, res);

}


let getAllUsers = (req, res) => {
    UserModel.find()
    .then((result) => {
        if(check.isEmpty(result)) {
            let apiResponse = response.generate(true, "No user found", 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "All users listed", 200, result);
            res.send(apiResponse);
        }
    })
    .catch((err) => {
        logger.error(`${err}`, "UserController: getAllUsers()", "high");
        res.send(err);
    });
}


let removeUser = (req, res) => {
    let userId = req.params.userId;

    let deleteUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.deleteOne({ userId: userId })
            .then((result) => {
                if (result.n > 0) {
                    logger.info("User found and deleted as per request", "UserController: removeUser(): deleteUser()", "successful");
                    resolve();
                } else {
                    logger.error("User cannot be found", "UserController: removeUser(): deleteUser()", "med");
                    let apiResponse = response.generate(true, "User not found", 404, result);
                    reject(apiResponse);
                }

            })
            .catch((err) => {
                logger.error(`${err}`, "UserController: removeUser(): deleteUser()", "high");
                let apiResponse = response.generate(true, "Unable to delete user", 500, null);
                reject(apiResponse);
            });
        })
    }

    removeAuth = () => {
        return new Promise((resolve, reject) => {
            AuthModel.deleteMany({ userId: userId })
            .then((result) => {
                if (result.n > 0) {
                    logger.info("User Auth deleted as per request", "UserController: removeUser(): removeAuth()", "successful");
                    resolve();
                } else {
                    logger.error("Couldn't find Auth for the user", "UserController: removeUser(): removeAuth()", "med");
                    let apiResponse = response.generate(true, "User Auth not found", 404, result);
                    reject(apiResponse);
                }
            })
            .catch((err) => {
                logger.error(`${err}`, "UserController: removeUser(): removeAuth()", "high");
                reject(err);
            });
        });
    }

    async function execute(req, res) {
        try {
            await deleteUser();
            await removeAuth();

            let apiResponse = response.generate(false, "User and auth associated with the user removed successfully", 201, null);
            res.send(apiResponse);
        } catch(error) {
            res.send(error);
        }
    }

    execute(req, res);

    
}


let getAllAuth = (req, res) => {
    AuthModel.find()
    .then(result => {
        if (check.isEmpty(result)) {
            let apiResponse = response.generate(true, "No Auth found", 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "All auth listed", 200, result);
            res.send(apiResponse);
        }
    })
    .catch(err => {
        logger.error(`${err}`, "UserController: getAllAuth()", "high");
        res.send(err);
    }) 
}


let removeAuth = (req, res) => {

    let userId = req.params.userId;

    AuthModel.deleteMany({userId: userId})
    .then((result) => {
        if(result.n > 0) {
            logger.info("User Auth deleted as per request", "UserController: removeAuth()", "successful");
            let apiResponse = response.generate(false, "User Auth successfully removed", 201, result);
            res.send(apiResponse);
        } else {
            logger.error("Couldn't find Auth for the user", "UserController: removeAuth()", "med");
            let apiResponse = response.generate(true, "User Auth not found", 404, result);
            res.send(apiResponse);
        }
    })
    .catch((err) => {
        logger.error(`${err}`, "UserController: removeAuth()", "high");
        res.send(err);
    });
}


module.exports = {
    signUpUser: signUpUser,
    loginUser: loginUser,
    editUser: editUser,
    getAllUsers: getAllUsers,
    getAllAuth: getAllAuth,
    removeUser: removeUser,
    removeAuth: removeAuth
}