const logger = require('./loggerLib');

const EventModel = require('./../models/eventModel');


let findEvent = (eventId, callback) => {
    EventModel.findOne({eventId: eventId})
    .then((result) => {
        callback(null, result);
    })
    .catch((err) => {
        logger.error(`${err}`, "EventLib: findEvent()", "high");
        callback(err, null);
    });
}


module.exports = {
    findEvent
}