const nodemailer = require('nodemailer');
const logger = require('./loggerLib');
const userLib = require('./userLib');
const check = require('./checkLib');
const appConfig = require('./../../config/appConfig');


// Create a SMTP transporter object
const transporter = nodemailer.createTransport({
    host: appConfig.smtp,
    port: appConfig.mailPort,
    secure: false,
    service: "gmail",
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: appConfig.email,
        pass: appConfig.password
    }
});


let resetPasswordEmail = (tokenObject, callback) => {
    let userObj = tokenObject.userDetails;
    let mailBody = `Hello <strong>${userObj.fullName}</strong>,<br> 
                As per your recent request to reset your password, we've generated a link through which you can reset your password. 
                Please click on the below link and change your password.<br>
                <a href="http://hermon.ga/reset/form/${userObj.userId}/${tokenObject.authToken}" target="_blank">
                    http://hermon.ga/reset/form/${userObj.userId}/${tokenObject.authToken}
                </a>
                `;

    
    let mailOptions = {
        from: `"Hermon Meeting" ${transporter.options.auth.user}`, //sender address
        to: `"${userObj.email}"`, //receivers email 
        subject: "Password Reset Email - Hermon",
        html: mailBody
    }

    transporter.sendMail(mailOptions, (err, result) => {
        if(err) {
            logger.error(`${err}`, "mailLib: resetPasswordEmail()", "high");
            callback(err, null);
        } else {
            logger.info("Password recovery email sent to the user", "mailLib: resetPasswordEmail()", "successful");
            callback(null, result);
        }
    });
}


let signUpEmail = (userObj, callback) => {
    let mailBody = `Hello and Welcome ${userObj.fullName},<br>
                    You account was created on our system following your request on our website. 
                    We thank and welcome you to our website, you can login on <a target="_blank" href="http://hermon.ga/login">http://hermon.ga/login</a>.<br>
                    Thank You for joining us.`;

    let mailOptions = {
        from: `"Hermon Meeting" ${transporter.options.auth.user}`,
        to: `"${userObj.email}"`,
        subject: "Welcome Email - Hermon",
        html: mailBody
    }


    transporter.sendMail(mailOptions)
    .then((result) => {
        logger.info('SignUp email sent to user', "mailLib: signUpEmail()", "successful");
        callback(null, result);
    })
    .catch((err) => {
        logger.error(`${err}`, "mailLib: signUpEmail()", "high");
        callback(err, null);
    });

}


let minuteBeforeEmail = (userId) => {
    

    let getUserDetails = () => {
        return new Promise((resolve, reject) => {
            userLib.findUserById(userId, (err, result) => {
                if(err) {
                    reject(err);
                } else if(check.isEmpty(result)) {
                    logger.error("No user found", "mailLib: minuteBeforeEmail(): getUserDetails()", "high");
                    reject("No User Found");
                } else {
                    resolve(result);
                }
            });
        });
    }

    let sendEmail = (userObj) => {
        let mailBody = `Hey ${userObj.fullName},<br> 
                        you've a meeting scheduled within a minute plz login to your account and check it before times out.<br>
                        Thank You`;
        let mailOptions = {
            from: `"Hermon Meeting" ${transporter.options.auth.user}`,
            to: `"${userObj.email}"`,
            subject: "Event remainder notification",
            html: mailBody
        }


        transporter.sendMail(mailOptions)
        .then((result) => {
            logger.info('Minute before remainder email sent to user', "mailLib: minuteBeforeEmail(): sendEmail()", "successful");
        })
        .catch((err) => {
            logger.error(`${err}`, "mailLib: minuteBeforeEmail(): sendEmail()", "high");
        });
    }


    async function execute() {
        try{
            let userDetails = await getUserDetails();
            let emailSent = await sendEmail(userDetails);

        }catch(error) {

        }
    }

    execute();

}


let eventCreatedEmail = (userId, message) => {

    let getUserDetails = () => {
        return new Promise((resolve, reject) => {
            userLib.findUserById(userId, (err, result) => {
                if (err) {
                    reject(err);
                } else if (check.isEmpty(result)) {
                    logger.error("No user found", "mailLib: eventCreatedEmail(): getUserDetails()", "high");
                    reject("No User Found");
                } else {
                    resolve(result);
                }
            });
        });
    }

    let sendEmail = (userObj) => {
        let mailBody = `Hey ${userObj.fullName},<br> 
                    ${message}.<br>
                    Thank You`;
        let mailOptions = {
            from: `"Hermon Meeting" ${transporter.options.auth.user}`,
            to: `"${userObj.email}"`,
            subject: "Event creation notification",
            html: mailBody
        }

        transporter.sendMail(mailOptions)
        .then((result) => {
            logger.info('Event creation email sent to user', "mailLib: eventCreatedEmail(): sendEmail()", "successful");
        })
        .catch((err) => {
            logger.error(`${err}`, "mailLib: eventCreatedEmail(): sendEmail()", "high");
        });
    }   

    async function execute() {
        try {
            let userDetails = await getUserDetails();
            let emailSent = await sendEmail(userDetails);

        } catch (error) {

        }
    }

    execute();

    
}


let eventRemovedEmail = (userId, message) => {

    let getUserDetails = () => {
        return new Promise((resolve, reject) => {
            userLib.findUserById(userId, (err, result) => {
                if (err) {
                    reject(err);
                } else if (check.isEmpty(result)) {
                    logger.error("No user found", "mailLib: eventRemovedEmail(): getUserDetails()", "high");
                    reject("No User Found");
                } else {
                    resolve(result);
                }
            });
        });
    }

    let sendEmail = (userObj) => {
        let mailBody = `Hey ${userObj.fullName},<br> 
                    ${message}.<br>
                    Thank You`;
        let mailOptions = {
            from: `"Hermon Meeting" ${transporter.options.auth.user}`,
            to: `"${userObj.email}"`,
            subject: "Event removed notification",
            html: mailBody
        }

        transporter.sendMail(mailOptions)
        .then((result) => {
            logger.info('Event removed email sent to user', "mailLib: eventRemovedEmail(): sendEmail()", "successful");
        })
        .catch((err) => {
            logger.error(`${err}`, "mailLib: eventRemovedEmail(): sendEmail()", "high");
        });
    }

    async function execute() {
        try {
            let userDetails = await getUserDetails();
            let emailSent = await sendEmail(userDetails);

        } catch (error) {

        }
    }

    execute();

}


let eventUpdatedEmail = (userId, message) => {

    let getUserDetails = () => {
        return new Promise((resolve, reject) => {
            userLib.findUserById(userId, (err, result) => {
                if (err) {
                    reject(err);
                } else if (check.isEmpty(result)) {
                    logger.error("No user found", "mailLib: eventUpdatedEmail(): getUserDetails()", "high");
                    reject("No User Found");
                } else {
                    resolve(result);
                }
            });
        });
    }

    let sendEmail = (userObj) => {
        let mailBody = `Hey ${userObj.fullName},<br> 
                    ${message}.<br>
                    Thank You`;
        let mailOptions = {
            from: `"Hermon Meeting" ${transporter.options.auth.user}`,
            to: `"${userObj.email}"`,
            subject: "Event update notification",
            html: mailBody
        }

        transporter.sendMail(mailOptions)
        .then((result) => {
            logger.info('Event update email sent to user', "mailLib: eventUpdatedEmail(): sendEmail()", "successful");
        })
        .catch((err) => {
            logger.error(`${err}`, "mailLib: eventUpdatedEmail(): sendEmail()", "high");
        });
    }

    async function execute() {
        try {
            let userDetails = await getUserDetails();
            let emailSent = await sendEmail(userDetails);

        } catch (error) {

        }
    }

    execute();


}

module.exports = {
    resetPasswordEmail: resetPasswordEmail,
    signUpEmail: signUpEmail,
    minuteBeforeEmail: minuteBeforeEmail,
    eventCreatedEmail: eventCreatedEmail,
    eventRemovedEmail: eventRemovedEmail,
    eventUpdatedEmail: eventUpdatedEmail
}