const express = require('express');
const router = express.Router();
const UserController = require('./../controllers/userController');

// router.get('/', (req, res) => {
//     console.log("User Route");
//     res.send("User Route Home");
// });

// router.post('/create', UserController.signUpUser);


// module.exports = router;

let setRouter = (route) => {

    let baseUrl = "/api/user";

    
    route.get(`${baseUrl}/all`, UserController.getAllUsers);

    route.post(`${baseUrl}/create`, UserController.signUpUser);
    
    route.put(`${baseUrl}/edit/:userId`, UserController.editUser);
    
    route.get(`${baseUrl}/delete/:userId`, UserController.removeUser);
    
    route.post(`${baseUrl}/login`, UserController.loginUser);
    
    route.get(`${baseUrl}/auth/all`, UserController.getAllAuth);

    route.get(`${baseUrl}/auth/remove/:userId`, UserController.removeAuth);
}

module.exports = {
    setRouter: setRouter
}