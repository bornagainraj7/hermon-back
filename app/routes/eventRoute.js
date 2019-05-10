const express = require('express');
const router = express.Router();

const auth = require('./../middlewares/auth');

const EventController = require('./../controllers/eventController');


let setRouter = (route) => {

    let baseUrl = "/api/event";

    route.get(`${baseUrl}/all`,auth.isAuthorized, EventController.getAllEvents);
    /**
     * @api {get} /api/event/all Get all events
     * @apiVersion 1.0.0
     * @apiGroup Event
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "All events listed successfully",
            "status": 200,
            "data": [{
                        "end": "Date",
                        "endTime": {
                            "hour": "number",
                            "minute": "number",
                            "second": "number"
                        },
                        "color": "string",
                        "modifiedOn": "Date",
                        "eventId": "string",
                        "title": "string",
                        "start": "Date",
                        "startTime": {
                            "hour": "number",
                            "minute": "number",
                            "second": "number"
                        },
                        "creatorId": "string",
                        "creatorName": "string",
                        "userId": "string",
                        "createdOn": "Date"
                    }]
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 404/500,
	    "data": null
	   }
    */
    
    route.get(`${baseUrl}/all/:userId`, auth.isAuthorized, EventController.getAllEventsForUser);
    /**
     * @api {get} /api/event/all/:userId Get all events for a particular user
     * @apiVersion 1.0.0
     * @apiGroup Event
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} userId userId of user as parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "All events listed for the user",
            "status": 200,
            "data": [{
                        "end": "Date",
                        "endTime": {
                            "hour": "number",
                            "minute": "number",
                            "second": "number"
                        },
                        "color": "string",
                        "modifiedOn": "Date",
                        "eventId": "string",
                        "title": "string",
                        "start": "Date",
                        "startTime": {
                            "hour": "number",
                            "minute": "number",
                            "second": "number"
                        },
                        "creatorId": "string",
                        "creatorName": "string",
                        "userId": "string",
                        "createdOn": "Date"
                    }]
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 404/500,
	    "data": null
	   }
    */

    route.get(`${baseUrl}/:eventId`, auth.isAuthorized, EventController.getSingleEvent);
    /**
     * @api {get} /api/event/:eventId Get single event
     * @apiVersion 1.0.0
     * @apiGroup Event
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} eventId eventId as URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Event retrieved successfully",
            "status": 200,
            "data": {
                        "end": "Date",
                        "endTime": {
                            "hour": "number",
                            "minute": "number",
                            "second": "number"
                        },
                        "color": "string",
                        "modifiedOn": "Date",
                        "eventId": "string",
                        "title": "string",
                        "start": "Date",
                        "startTime": {
                            "hour": "number",
                            "minute": "number",
                            "second": "number"
                        },
                        "creatorId": "string",
                        "creatorName": "string",
                        "userId": "string",
                        "createdOn": "Date"
                    }
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 404/500,
	    "data": null
	   }
    */


    route.post(`${baseUrl}/create`, auth.isAuthorized, auth.isAdmin, EventController.createEvent);
    /**
     * @api {post} /api/event/create Create event
     * @apiVersion 1.0.0
     * @apiGroup Event(Admin)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} title title as body parameter
     * @apiParam {Date} start start as body parameter
     * @apiParam {Date} end end as body parameter
     * @apiParam {Object} startTime startTime as body parameter
     * @apiParam {Object} endTime endTime as body parameter
     * @apiParam {String} userId userId of user to assign event as body parameter
     * @apiParam {String} color color code in hexadecimal form(#000000) as body parameter
     *
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Event created succesfully",
            "status": 201,
            "data": {
                        "end": "Date",
                        "endTime": {
                            "hour": "number",
                            "minute": "number",
                            "second": "number"
                        },
                        "color": "string",
                        "modifiedOn": "Date",
                        "eventId": "string",
                        "title": "string",
                        "start": "Date",
                        "startTime": {
                            "hour": "number",
                            "minute": "number",
                            "second": "number"
                        },
                        "creatorId": "string",
                        "creatorName": "string",
                        "userId": "string",
                        "createdOn": "Date"
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

    route.put(`${baseUrl}/edit/:eventId`, auth.isAuthorized, auth.isAdmin, EventController.updateEvent);
    /**
     * @api {put} /api/event/edit/:eventId Edit event
     * @apiVersion 1.0.0
     * @apiGroup Event(Admin)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} title title as body parameter
     * @apiParam {Date} start start as body parameter
     * @apiParam {Date} end end as body parameter
     * @apiParam {Object} startTime startTime as body parameter
     * @apiParam {Object} endTime endTime as body parameter
     * @apiParam {String} userId userId of user to assign event as body parameter
     * @apiParam {String} color color code in hexadecimal form(#000000) as body parameter
     *
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "The event was updated successfully!",
            "status": 201,
            "data": null
        }
    @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured",
	    "status": 404/500,
	    "data": null
	   }
    */

    route.post(`${baseUrl}/delete/:eventId`, auth.isAuthorized, auth.isAdmin, EventController.removeEvent);
    /**
     * @api {post} /api/event/delete/:eventId Delete Single event by eventId
     * @apiVersion 1.0.0
     * @apiGroup Event(Admin)
     * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} eventId pass eventId in URL parameter
     * 
     *  @apiSuccessExample {json} Success-Response:
     *  {
            "error": false,
            "message": "Event was deleted successfully as per request",
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

    route.get(`${baseUrl}/count/all`, auth.isAuthorized, auth.isAdmin, EventController.getAllEventsCount);
    /**
     * @api {get} /api/event/count/all number of total of all event
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

    route.get(`${baseUrl}/count/by-user`, auth.isAuthorized, auth.isAdmin, EventController.getAllEventsByUserCount);
    /**
     * @api {get} /api/event/count/by-user number of total of all event by current user
     * @apiVersion 1.0.0
     * @apiGroup Count
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