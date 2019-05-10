const express = require('express');
const router = express.Router();
const UserController = require('./../controllers/userController');

const auth = require('./../middlewares/auth');


let setRouter = (route) => {

    let baseUrl = "/api/user";

    
    route.get(`${baseUrl}/all`, auth.isAuthorized, auth.isAdmin, UserController.getAllUsers);
    /**
     * @api {get} /api/user/all Retrieve All User
     * @apiVersion 1.0.0
     * @apiGroup User(Admin)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "All users listed",
            "status": 200,
            "data": [{
                    "lastName": "string",
                    "userId": "string",
                    "firstName": "string",
                    "fullName": "string",
                    "username": "string",
                    "title": "string",
                    "email": "string",
                    "country": "string",
                    "mobileNumber": "string",
                    "isAdmin": "boolean"
                }]
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */


    route.get(`${baseUrl}/all/normal`, auth.isAuthorized, auth.isAdmin, UserController.getAllNormalUsers);
    /**
     * @api {get} /api/user/all/normal Retrieve All Normal User
     * @apiVersion 1.0.0
     * @apiGroup User(Admin)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "All normal users listed",
            "status": 200,
            "data": [{
                    "lastName": "string",
                    "userId": "string",
                    "firstName": "string",
                    "fullName": "string",
                    "username": "string",
                    "title": "string",
                    "email": "string",
                    "country": "string",
                    "mobileNumber": "string",
                    "isAdmin": "boolean"
                }]
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */ 


    route.get(`${baseUrl}/all/admin`, auth.isAuthorized, auth.isAdmin, UserController.getAllAdminUsers);
    /**
     * @api {get} /api/user/all/admin Retrieve All Admin User
     * @apiVersion 1.0.0
     * @apiGroup User(Admin)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "All admin users listed",
            "status": 200,
            "data": [{
                    "lastName": "string",
                    "userId": "string",
                    "firstName": "string",
                    "fullName": "string",
                    "username": "string",
                    "title": "string",
                    "email": "string",
                    "country": "string",
                    "mobileNumber": "string",
                    "isAdmin": "boolean"
                }]
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */ 


    route.get(`${baseUrl}/:userId`, auth.isAuthorized, UserController.getSingleUser);
    /**
     * @api {get} /api/user/:userId Retrieve Single User by userId
     * @apiVersion 1.0.0
     * @apiGroup User
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} userId pass userId in URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "User details found",
            "status": 200,
            "data": {
                    "lastName": "string",
                    "userId": "string",
                    "firstName": "string",
                    "fullName": "string",
                    "username": "string",
                    "title": "string",
                    "email": "string",
                    "country": "string",
                    "mobileNumber": "string",
                    "isAdmin": "boolean"
                }
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    route.post(`${baseUrl}/create`, UserController.signUpUser);
    /**
     * @api {post} /api/user/create SignUp User
     * @apiVersion 1.0.0
     * @apiGroup User
     *
	 * @apiParam {String} firstName body parameter
	 * @apiParam {String} lastName body parameter
	 * @apiParam {String} email body parameter
	 * @apiParam {String} password body parameter
	 * @apiParam {String} username body parameter
	 * @apiParam {String} country body parameter
	 * @apiParam {String} telcode body parameter
	 * @apiParam {Number} mobileNumber body parameter
	 * @apiParam {Boolean} isAdmin body parameter
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
        "error": false,
        "message": ""User created and auth token generated Successfully",
        "status": 201,
        "data": {   authToken: "string",
                    userId: "string",
                    expiresIn: "number",
                    userDetails:{
                        "lastName": "string",
                        "userId": "string",
                        "firstName": "string",
                        "fullName": "string",
                        "username": "string",
                        "title": "string",
                        "email": "string",
                        "country": "string",
                        "mobileNumber": "string",
                        "isAdmin": "boolean"
                    }
            
                }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
	*/
    
    route.get(`${baseUrl}/delete/:userId`, auth.isAuthorized, auth.isAdmin, UserController.removeUser);
    /**
     * @api {get} /api/user/delete/:userId Delete Single User by userId
     * @apiVersion 1.0.0
     * @apiGroup User(Admin)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} userId pass userId in URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "User and auth associated with the user removed successfully",
            "status": 201,
            "data": null
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */

    
    route.post(`${baseUrl}/login`, UserController.loginUser);
     /**
     * @api {post} /api/user/login Login User
     * @apiVersion 1.0.0
     * @apiGroup User
     *
	 * @apiParam {String} email body parameter
	 * @apiParam {String} password body parameter
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
        "error": false,
        "message": ""User created and auth token generated Successfully",
        "status": 201,
        "data": {   authToken: "string",
                    userId: "string",
                    expiresIn: "number",
                    userDetails:{
                        "lastName": "string",
                        "userId": "string",
                        "firstName": "string",
                        "fullName": "string",
                        "username": "string",
                        "title": "string",
                        "email": "string",
                        "country": "string",
                        "mobileNumber": "string",
                        "isAdmin": "boolean"
                    }
            
                }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
    */
    

    route.post(`${baseUrl}/logout`, auth.isAuthorized, UserController.logoutUser);
    /**
     * @api {post} /api/user/logout Logout User
     * @apiVersion 1.0.0
     * @apiGroup User
     *
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "User logged out successfully",
            "status": 201,
            "data": "null"
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500/404,
	    "data": null
	   }
	*/

    route.post(`${baseUrl}/check/username`, UserController.checkUserName);
    /**
     * @api {post} /api/user/check/username Check if username already taken
     * @apiVersion 1.0.0
     * @apiGroup User
     *
     * @apiParam {String} username as Body parameter.
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "The username you entered is available",
            "status": 200,
            "data": "null"
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "The username you enetered is already taken/Error Occured",
	    "status": 401/500
	    "data": null
	   }
	*/
    
    
    route.post(`${baseUrl}/recover/password`, UserController.recoverPassword);
    /**
     * @api {post} /api/user/recover/password To generate email to reset password
     * @apiVersion 1.0.0
     * @apiGroup User
     *
     * @apiParam {String} email as Body parameter.
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Please click on the link in your registered email, do check your spam if not in inbox.",
            "status": 201,
            "data": "null(email will be sent your registered email address with link to reset password)"
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 404/500
	    "data": null
	   }
    */
    

    route.put(`${baseUrl}/reset/password/:authToken`, auth.isAuthorized, UserController.resetPassword);
    /**
     * @api {post} /api/user/reset/password/:authToken To reset your password
     * @apiVersion 1.0.0
     * @apiGroup User
     *
     * @apiParam {String} authToken as URL parameter.
     * @apiParam {String} password as Body parameter.
     *
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Password was successfully reset, please login to continue",
            "status": 201,
            "data": "null"
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 404/500
	    "data": null
	   }
    */


    route.get(`${baseUrl}/count/admin`, auth.isAuthorized, auth.isAdmin, UserController.getAllAdminCount);
    /**
     * @api {get} /api/user/count/admin number of total admin users
     * @apiVersion 1.0.0
     * @apiGroup Count(Admin)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Count retrivied",
            "status": 200,
            "data": "number"
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500,
	    "data": null
	   }
    */

    route.get(`${baseUrl}/count/user`, auth.isAuthorized, auth.isAdmin, UserController.getAllNormalUsersCount);
    /**
     * @api {get} /api/user/count/user number of total normal users
     * @apiVersion 1.0.0
     * @apiGroup Count(Admin)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Count retrivied",
            "status": 200,
            "data": "number"
            }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 500,
	    "data": null
	   }
    */

}

module.exports = {
    setRouter: setRouter
}