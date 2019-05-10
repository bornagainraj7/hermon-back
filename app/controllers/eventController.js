let shortId = require('shortid');

let response = require('./../libs/responseLib');
let check = require('./../libs/checkLib');
let logger = require('./../libs/loggerLib');
let eventLib = require('./../libs/eventLib');

let UserModel = require('./../models/userModel');
let EventModel = require('./../models/eventModel');


let createEvent = (req, res) => {
    let creatorName = req.user.fullName;
    let creatorId = req.user.userId;

    const event = new EventModel({
        eventId: shortId.generate(),
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        creatorId: creatorId,
        creatorName: creatorName,
        userId: req.body.userId,
        color: req.body.color,
        createdOn: new Date()
    });

    event.save()
    .then((result) => {
        logger.info('Event created successfully', "EventController: createEvent()", "successful");
        let createdEvent = event.toObject();
        let apiResponse = response.generate(false, "Event created succesfully", 201, createdEvent);
        res.send(apiResponse);
    })
    .catch((err) => {
        logger.error(`${err}`, "EventController: CreateEvent()", "high");
        let apiResponse = response.generate(true, "Server went into an error while creating an event", 500, null);
        res.send(apiResponse);
    });
}


let getAllEvents = (req, res) => {

    EventModel.find().sort({createdOn: -1}).select('-_id -__v').lean()
    .then((result) => {
        if(check.isEmpty(result)) {
            let apiResponse = response.generate(true, "No events found", 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "All events listed successfully", 200, result);
            res.send(apiResponse);
        }
    })
    .catch((err) => {
        logger.error(`${err}`, "EventController: getAllEvents", "high");
        let apiResponse = response.generate(true, "Couldn't fetch events", 500, null);
        res.send(apiResponse);
    });
}


let getAllEventsForUser = (req, res) => {
    let userId = req.params.userId;
    EventModel.find({ userId: userId }).sort({ createdOn: -1 }).select('-_id -__v').lean()
    .then((result) => {
        if(check.isEmpty(result)) {
            let apiResponse = response.generate(true, "There is no event for this user", 404, null);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(false, "All events listed for the user", 200, result);
            res.send(apiResponse);
        }
    })
    .catch((err) => {
        logger.error(`${err}`, "EventController: getAllEventsForUser", "high");
        let apiResponse = response.generate(true, "Couldn't fetch events", 500, null);
        res.send(apiResponse);
    });
}


let getSingleEvent = (req, res) => {
    let eventId = req.params.eventId;
    
    let findEvent = () => {
        return new Promise((resolve, reject) => {
            eventLib.findEvent(eventId, (err, result) => {
                if(err) {
                    let apiResponse = response.generate(true, "Error while fetching event", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)) {
                    let apiResponse = response.generate(true, "Couldn't find the event", 404, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            });
        });
    }

    async function getEvent(req, res) {
        try{
            let currentEvent = await findEvent();

            let apiResponse = response.generate(false, "Event retrieved successfully", 200, currentEvent);
            res.send(apiResponse);
        } catch(error) {
            res.send(error);
        }
    }

    getEvent(req, res);
}


let updateEvent = (req, res) => {
    let options = req.body;
    options.modifiedOn = new Date();
    let eventId = req.params.eventId;

    let findEvent = () => {
        return new Promise((resolve, reject) => {
            eventLib.findEvent(eventId, (err, result) => {
                if(err) {
                    let apiResponse = response.generate(true, "Error while fetching event", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)) {
                    let apiResponse = response.generate(true, "Couldn't find the event", 404, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            });
        });
    }

    let editEvent = () => {
        return new Promise((resolve, reject) => {
            EventModel.updateOne({ eventId: eventId }, options, { new: true })
            .then((result) => {
                if(result.n > 0) {
                    logger.info("Event updated successfully", "EventController(): UpdateEvent(): EditEvent()", "successful");
                    resolve(result);
                }
            })
            .catch((err) => {
                logger.error(`${err}`, "Couldn't update event, server error", "high");
                let apiResponse = response.generate(true, "Couldn't update event, server error", 500, null);
                reject(apiResponse);
            });
        });
    }


    async function execute(req, res) {
        try{
            let event = await findEvent();
            let eventEdited = await editEvent();

            let apiResponse = response.generate(false, "The event was updated successfully!", 201, null);
            res.send(apiResponse);
        } catch(error) {
            res.send(error);
        }
    }

    execute(req, res);

}


let removeEvent = (req, res) => {
    let eventId = req.params.eventId;


    let findEvent = () => {
        return new Promise((resolve, reject) => {
            eventLib.findEvent(eventId, (err, result) => {
                if(err) {
                    let apiResponse = response.generate(true, "Couldn;t find the event", 500, null);
                    reject(apiResponse);
                } else if(check.isEmpty(result)) {
                    let apiResponse = response.generate(true, "Event not found or already deleted", 404, null);
                    reject(apiResponse);
                } else {
                    resolve(result);
                }
            });
        });
    }

    let deleteEvent = () => {
        return new Promise((resolve, reject) => {
            EventModel.deleteOne({eventId: eventId})
            .then((result) => {
                if(result.n > 0) {
                    logger.info("Event deleted as per request", "EventController: RemoveEvent(): DeleteEvent()", "successful");
                    resolve();
                }
            })
            .catch((err) => {
                logger.error(`${err}`, "EventController: RemoveEvent(): DeleteEvent()", "high");
                let apiResponse = response.generate(true, "Couldn't delete the event", 500, null);
                reject(apiResponse);
            });
        });
    }


    async function execute(req, res) {
        try {
            let event = await findEvent();
            let finalResponse = await deleteEvent();

            let apiResponse = response.generate(false, "Event was deleted successfully as per request", 201, null);
            res.send(apiResponse);
        } catch(error) {
            console.log(error);
            res.send(error);
        }
    } 

    execute(req, res);

}


let getAllEventsCount = (req, res) => {
    
    EventModel.countDocuments({})
    .then((count) => {
        let apiResponse = response.generate(false, "Count retrivied", 200, count);
        res.send(apiResponse);
    })
    .catch((err) => {
        logger.error(`${err}`, "EventController: getAllEventCount()", 'high');
        let apiResponse = response.generate(true, `${err}`, 500, null);
        res.send(apiResponse);
    });
}



let getAllEventsByUserCount = (req, res) => {
    let userId = req.user.userId;

    EventModel.countDocuments({userId: userId})
    .then((count) => {
        let apiResponse = response.generate(false, "Count retrivied", 200, count);
        res.send(apiResponse);
    })
    .catch((err) => {
        logger.error(`${err}`, "EventController: getAllEventByUserCount()", 'high');
        let apiResponse = response.generate(true, `${err}`, 500, null);
        res.send(apiResponse);
    });
}


module.exports = {
    createEvent,
    getAllEvents,
    getAllEventsForUser,
    getSingleEvent,
    updateEvent,
    removeEvent,
    getAllEventsCount,
    getAllEventsByUserCount
}