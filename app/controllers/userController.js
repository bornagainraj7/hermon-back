const shortId = require('shortid');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib');
const validateInput = require('./../libs/paramsValidationLib');
const passwordLib = require('./../libs/passwordLib');
const tokenLib = require('./../libs/tokenLib');
const time = require('./../libs/timeLib');
const userLib = require('../libs/userLib');
const mailLib = require('./../libs/mailLib');

const UserModel = require('./../models/userModel');
const EventModel = require('./../models/eventModel');
const AuthModel = require('./../models/authModel');

// signup function
let signUpUser = (req, res) => {
    let username = req.body.username.toLowerCase();
    let email = req.body.email.toLowerCase();
    let password = passwordLib.hashPassword(req.body.password);
    let title;

    console.log(req.body.isAdmin);

    if(req.body.isAdmin == true || req.body.isAdmin == 'true') {
        title = "admin";
        console.log("27 " +title+": "+req.body.isAdmin);
    } else if (req.body.isAdmin == null || req.body.isAdmin == undefined || req.body.isAdmin == false || req.body.isAdmin == 'false') {
        title = "user";
        console.log("30 "+title + ": " + req.body.isAdmin);
    }
    

    let newUser = new UserModel({
        userId: shortId.generate(),
        firstName: check.trim(req.body.firstName),
        lastName: check.trim(req.body.lastName) || '',
        fullName: `${req.body.firstName} ${req.body.lastName}`,
        username: username,
        title: title,
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
                    userLib.ifUserExists(req.body.email, (err, result) => {
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
                let newUserObj = newUser.toObject();

                delete newUserObj.password;
                delete newUserObj._id;
                delete newUserObj.__v;

                newUserObj.username = newUserObj.username + '-' + newUserObj.title;

                logger.info('User Created successfully', "UserController: SignUpUser(): createUser()", "successful");
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
            tokenLib.saveToken(token, (err, response) => {
                if(err) {
                    let apiResponse = response.generate(true, "Couldn't initialize auth token for the user", 500, null);
                    reject(apiResponse);
                } else {
                    logger.info('Token saved successfully', "UserController: SignUpUser(): saveToken()", "successful");
                    resolve(response);
                }
            });
        });
    }

    let sendWelcomeMail = (userObj) => {
        return new Promise((resolve, reject) => {
            mailLib.signUpEmail(userObj, (err, result) => {
                if(err) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }


    async function execute(req, res) {
        try{
            const userLib = await ifUserExists();
            const newUserObj = await createUser();
            const generatedToken = await generateToken(newUserObj);
            const finalResponse = await saveToken(generatedToken);
            const mail = await sendWelcomeMail(newUserObj);

            if(mail) {
                let apiResponse = response.generate(false, "User created and auth token generated Successfully with welcome email", 201, finalResponse);
                res.send(apiResponse);
            } else {
                let apiResponse = response.generate(false, "User created and auth token generated Successfully without welcome email", 201, finalResponse);
                res.send(apiResponse);
            }
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

    let findUser = () => {
        return new Promise((resolve, reject) => {
            userLib.findUser(email, (err, result) => {
                if(err) {
                    logger.error(`${err}`, "UserController: LoginUser(): findUser()", "high");
                    let apiResponse = response.generate(true, "Couldn't get user details", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)){
                    logger.error("User not found", "UserController: LoginUser(): findUser()", "med");
                    let apiResponse = response.generate(true, "User not found", 404, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            });
        });
    }

    let validatePassword = (userObj) => {
        return new Promise((resolve, reject) => {
            passwordLib.comparePassword(password, userObj.password, (err, result) => {
                if(err) {
                    let apiResponse = response.generate(true, "Password didn't match", 404, null);
                    reject(apiResponse);
                } else if(result === true) {
                    resolve(result);
                } else {
                    let apiResponse = response.generate(true, "Password didn't match", 404, null);
                    reject(apiResponse);
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
                    // logger.info("Token generated successfully", "UserController: loginUser(): generateToken()", "successful");

                    token.userId = userDetails.userId;
                    token.expiresIn = 86395;
                    token.userDetails = userDetails;

                    resolve(token);

                }
            });
        });
    }

    let saveToken = (token) => {
        return new Promise((resolve, reject) => {
            tokenLib.saveToken(token, (err, response) => {
                if (err) {
                    let apiResponse = response.generate(true, "Couldn't initialize auth token for the user", 500, null);
                    reject(apiResponse);
                } else {
                    // logger.info("Token saved successfully", "UserController: LoginUser(): saveToken()", "success");
                    resolve(response);
                }
            });
        });
    }


    async function execute(req, res) {
        try {
            const user = await findUser();
            const password = await validatePassword(user);
            const generatedToken = await generateToken(user);
            const finalResponse = await saveToken(generatedToken);

            let apiResponse = response.generate(false, "User logged in successfully", 201, finalResponse);
            res.send(apiResponse);

        } catch(error) {
            res.send(error);
        }
    }

    execute(req, res);

}


let getAllUsers = (req, res) => {
    UserModel.find().select('-password -__v -_id').lean()
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
        let apiResponse = response.generate(true, `${err}`, 500, null);
        res.send(apiResponse);
    });
}


let getAllAdminUsers = (req, res) => {
    UserModel.find({isAdmin: true}).select('-password -__v -_id').lean()
    .then((result) => {
        if(check.isEmpty(result)) {
            let apiResponse = response.generate(true, "No admin users found", 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "All admin users listed", 200, result);
            res.send(apiResponse);
        }
    })
    .catch((err) => {
        logger.error(`${err}`, "UserController: getAllAdminUsers", "high");
        let apiResponse = response.generate(true, `${err}`, 500, null);
        res.send(apiResponse);
    })
}


let getAllNormalUsers = (req, res) => {
    UserModel.find({isAdmin: false}).select('-password -__v -_id').lean()
    .then((result) => {
        if(check.isEmpty(result)) {
            let apiResponse = response.generate(true, "No normal users found", 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "All normal users listed", 200, result);
            res.send(apiResponse);
        }
    })
    .catch((err) => {
        logger.error(`${err}`, "UserController: getAllNormalUsers", "high");
        let apiResponse = response.generate(true, `${err}`, 500, null);
        res.send(apiResponse);
    })
}


let getSingleUser = (req, res) => {
    let userId = req.params.userId;

    userLib.findUserById(userId, (err, result) => {
        if(err) {
            let apiResponse = response.generate(true, "Couldn't get user", 500, null);
            res.send(apiResponse);
        } else if(check.isEmpty(result)) {
            logger.error("User not found", "UserController: getSingleUser()", "med");
            let apiResponse = response.generate(true, "User not found", 404, null);
            res.send(apiResponse);
        } else {
            delete result.password;
            let apiResponse = response.generate(false, "User details found", 200, result);
            res.send(apiResponse);
        }
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
                let apiResponse = response.generate(true, "Couldn't delete user auth", 500, result);
                reject(apiResponse);
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


let logoutUser = (req, res) => {
    let userId = req.user.userId;
    AuthModel.deleteOne({userId: userId})
    .then((result) => {
        if(result.n > 0) {
            let apiResponse = response.generate(false, "User logged out successfully", 201, null);
            res.send(apiResponse);
        } else {
            logger.error("User already logged out or invalid userId", "UserController: logoutUser()", 'high');
            let apiResponse = response.generate(true, "User already logged out or invalid userId", 404, null);
            res.send(apiResponse);
        }
    })
    .catch((err) => {
        logger.error(`${err}`, "UserController: logoutUser()", "high");
        let apiResponse = response.generate(true, "Server went into an error while trying to logout", 500, null);
        res.send(apiResponse);
    });

}


let recoverPassword = (req, res) => {
    let email = req.body.email;

    let validateUser = () => {
        return new Promise((resolve, reject) => {
            userLib.findUser(email, (error, result) => {
                if(error) {
                    logger.error(`${error}`, "UserController: recoverPassword(): validateUser()", "high");
                    let apiResponse = response.generate(true, "Server error while validating user", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)) {
                    logger.error("Couldn't find user", "UserController: recoverPassword(): validateUser()", "med");
                    let apiResponse = response.generate(true, "Couldn't find user", 404, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            });
        });
    }

    let generateToken = (userObj) => {
        return new Promise((resolve, reject) => {
            tokenLib.generateToken(userObj, (err, tokenDetails) => {
                if(err) {
                    let apiResponse = response.generate(true, "failed to generate token", 500, null);
                    reject(apiResponse);
                } else {
                    logger.info("Token generated successfully", "UserController: recoverPassword(): generateToken", "successful");

                    tokenDetails.userId = userObj.userId;
                    tokenDetails.expiresIn = 86395;
                    tokenDetails.userDetails = userObj;

                    resolve(tokenDetails);
                }
            });
        });
    }

    let saveToken = (tokenDetails) => {
        return new Promise((resolve, reject) => {
            tokenLib.saveToken(tokenDetails, (err, response) => {
                if(err) {
                    let apiResponse = response.generate(true, "Couldn't initialize token for the user", 500, null);
                    reject(apiResponse);
                } else {
                    logger.info('Token saved successfully', "UserController: recoverPassword(): saveToken()", "successful")
                    resolve(response);
                }
            });
        });
    }

    let sendEmail = (savedToken) => {
        return new Promise((resolve, reject) => {
            mailLib.resetPasswordEmail(savedToken, (err, result) => {
                if(err) {
                    let apiResponse = response.generate(`${err}`, "Some error while sending email", 500, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            });
        });
    }


    async function execute(req, res) {
        try {
            let userObj = await validateUser();
            let tokenGenerated = await generateToken(userObj);
            let savedToken = await saveToken(tokenGenerated);
            let email = await sendEmail(savedToken);

            let apiResponse = response.generate(false, "Please click on the link in your registered email, do check your spam if not in inbox.", 201, null);
            res.send(apiResponse);

        } catch(error) {
            res.send(error);
        }
    }

    execute(req, res);

}


let resetPassword = (req, res) => {
    let userId = req.user.userId;
    let newPassword = req.body.password;
    let options = req.body;

    let findUser = () => {
        return new Promise((resolve, reject) => {
            userLib.findUserById(userId, (err, result) => {
                if(err) {
                    let apiResponse = response.generate(true, "Couldn't verify user", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)){
                    let apiResponse = response.generate(true, "Couldn't find user", 404, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            });
        });
    }

    let samePassword = (userDetails) => {
        console.log('same password');
        return new Promise((resolve, reject) => {
            console.log(newPassword);
            console.log(userDetails.password);
            passwordLib.comparePassword(newPassword, userDetails.password, (err, res) => {
                if(err) {
                    logger.error(`${err}`, "UserController: resetPassword(): samePassword()", "high")
                    let apiResponse = response.generate(true, "Couldn't assign new password to user", 500, null);
                    reject(apiResponse);
                } else if (res === false){
                    resolve();
                } else if(res === true) {
                    let apiResponse = response.generate(true, "New password should be different from current password", 401, null);
                    reject(apiResponse);
                }
            });
        });
    }

    let changePassword = () => {
        options.password = passwordLib.hashPassword(options.password);
        console.log('change password');
        return new Promise((resolve, reject) => {
            UserModel.updateOne({ userId: userId }, options, { new: true })
            .then((result) => {
                if(result.n > 0) {
                    logger.info("Password was successfully reset", "UserController: resetPassword()", "successful");
                    resolve(result);
                }
            })
            .catch((err) => {
                logger.error(`${err}`, "UserController: resetPassword()", "high");
                let apiResponse = response.generate(true, "Couldn't reset password", 500, null);
                reject(apiResponse);
            });
        });
    }


    async function execute(req, res) {
        try{
            let user = await findUser();
            let oldPassword = await samePassword(user);
            let finalResponse = await changePassword();

            let apiResponse = response.generate(false, "Password was successfully reset, please login to continue", 201, null);
            res.send(apiResponse);
        } catch(error) {
            res.send(error);
        }
    }

    execute(req, res);

}


let checkUserName = (req, res) => {
    userName = req.body.username;

    UserModel.find({username : userName})
    .then((result) => {
        if(check.isEmpty(result)) {
            let apiResponse = response.generate(false, "The username you entered is available", 200, null);
            res.send(apiResponse);
        } else {   
            let apiResponse = response.generate(true, "The username you enetered is already taken", 401, null);
            res.send(apiResponse);
        }
    })
    .catch((err) => {
        logger.error(`${err}`, "UserController: checkUserName()", "high");
        let apiResponse = response.generate(true, "Error while fetching data from the server, try again later", 500, null);
        res.send(apiResponse);
    });
}


let getAllAdminCount = (req, res) => {
    UserModel.countDocuments({isAdmin: true})
    .then((count) => {
        let apiResponse = response.generate(false, "Count retrivied", 200, count);
        res.send(apiResponse);
    })
    .catch((err) => {
        logger.error(`${err}`, "UserController: getAllAdminCount()", "high");
        let apiResponse = response.generate(true, `${err}`, 500, null);
        res.send(apiResponse);
    });
}


let getAllNormalUsersCount = (req, res) => {
    UserModel.countDocuments({isAdmin: false})
    .then((count) => {
        let apiResponse = response.generate(false, "Count retrivied", 200, count);
        res.send(apiResponse);
    })
    .catch((error) => {
        logger.error(`${error}`, "UserController: getAllNormalUsersCount()", "high");
        let apiResponse = response.generate(true, `${error}`, 500, null);
        res.send(apiResponse);
    });
}



module.exports = {
    signUpUser: signUpUser,
    loginUser: loginUser,
    getAllUsers: getAllUsers,
    getSingleUser: getSingleUser,
    removeUser: removeUser,
    logoutUser: logoutUser,
    recoverPassword: recoverPassword,
    resetPassword: resetPassword,
    checkUserName: checkUserName,
    getAllAdminUsers: getAllAdminUsers,
    getAllNormalUsers: getAllNormalUsers,
    getAllAdminCount: getAllAdminCount,
    getAllNormalUsersCount: getAllNormalUsersCount
}