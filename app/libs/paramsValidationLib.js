let validateEmail = (email) => {
    let emailRegex = /^\w+([\.-]?\w)*@\w+([\.-]?\w +)*(\.\w{2,3})+$/;
    if(email.match(emailRegex)) {
        return email;
    } else {
        return false;
    }
}

let validatePassword = (password) => {
    let passwordRegex = /^[A-Za-z0-9]\w{5,}$/;
    if(password.match(passwordRegex)) {
        return password;
    } else {
        return false;
    }
}


module.exports = {
    email: validateEmail,
    password: validatePassword
}