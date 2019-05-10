const socketio = require('socket.io');
const shortId = require('shortid');
const tokenLib = require('./tokenLib');
const logger = require('./loggerLib');
const mailLib = require('./mailLib');

const events = require('events');
const eventEmitter = new events.EventEmitter();

let setServer = (server) => {
    
    let allOnlineUsers = [];
    let IO = socketio.listen(server);
    let myIO = IO.of('');


    // IO.on('connection', (socket) => {
    //     console.log('connected');
    // });

    myIO.on('connection', (socket) => {
        let currentUser;

        socket.emit('verify-user', '');

        socket.on('set-user', (authToken) => {
            tokenLib.verifyWithoutSecret(authToken, (err, result) => {
                console.log('setting-user...');
                if(err) {
                    socket.emit('auth-error', {error: true,status: 500, message: "AuthToken error", data: null});
                } else {
                    socket.userId = result.userId;
                    currentUser = {
                        userId: result.userId,
                        fullName: result.fullName,
                        email: result.email,
                        isAdmin: result.isAdmin
                    };

                    allOnlineUsers.push(currentUser);

                    // broadcasting
                    socket.room = 'notification';
                    socket.join(socket.room);
                    socket.to(socket.room).broadcast.emit('online-user-list', allOnlineUsers);

                }
            });
        });// end of set user event


        socket.on('event-added', (userId) => {
            let emitData;
            if (currentUser.userId == userId) {
                emitData = "You've added and event to your event list";
            } else {
                emitData = `${currentUser.fullName} has added an event for you`;
            }
            mailLib.eventCreatedEmail(userId, emitData);
            myIO.emit(userId, emitData);
        });

        socket.on('event-updated', (userId) => {
            console.log("event - update");
            let emitData;
            if(currentUser.userId == userId) {
                emitData = "You've updated one of your event";
            } else {
                emitData = `${currentUser.fullName} has updated one of your event`;
            }
            mailLib.eventUpdatedEmail(userId, emitData);
            myIO.emit(userId, emitData);
        });

        socket.on('event-removed', (userId) => {
            let emitData;
            if (currentUser.userId == userId) {
                emitData = "You've removed an event form your event list";
            } else {
                emitData = `${currentUser.fullName} has removed an event form your event list`;
            }
            mailLib.eventRemovedEmail(userId, emitData);
            myIO.emit(userId, emitData);
        });

        socket.on('minute-before', (userId) => {
            mailLib.minuteBeforeEmail(userId);
        });


        // disconnect
        socket.on('disconnect', () => {
            let removeIndex = allOnlineUsers.map(user => {
                if(socket.userId == user.userId) {
                    return user.userId;
                }
            }).indexOf(allOnlineUsers.currentUser);
            allOnlineUsers.splice(removeIndex, 1);
            // allOnlineUsers.splice(allOnlineUsers.indexOf(currentUser), 1);
            // refreshing and emitting new online users list
            socket.to(socket.room).broadcast.emit('online-user-list', allOnlineUsers);
            socket.leave(socket.room);
        });// end of disconnect event


    });// end of connection


}


module.exports = {
    setServer: setServer
}