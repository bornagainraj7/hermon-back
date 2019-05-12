const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const http = require('http');
const debug = require('debug')('node-express');
const morgan = require('morgan');
const fs = require('fs');
const routeLogger = require('./app/middlewares/routeLogger');
const errorHandler = require('./app/middlewares/appErrorHandler');
const mongoose = require('mongoose');
const logger = require('./app/libs/loggerLib');
const response = require('./app/libs/responseLib');

const appConfig = require('./config/appConfig');

//Routes
const userRoutes = require('./app/routes/userRoute');
const eventRoutes = require('./app/routes/eventRoute');

// Models
const userModel = require('./app/models/userModel');
const eventModel = require('./app/models/eventModel');

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(routeLogger.ipLogger);
app.use(errorHandler.errorHandler);

// Set Headers for CORS
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, authToken");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTIONS");
//     next();
// });


// const modelsPath = './app/models';
const routesPath = './app/routes';

//Bootstrap models
// fs.readdirSync(modelsPath).forEach((file) => {
//     if (~file.indexOf('.js')) require(modelsPath + '/' + file)
// });
// end Bootstrap models

// Bootstrap route
fs.readdirSync(routesPath).forEach((file) => {
    if (~file.indexOf('.js')) {
        let route = require(routesPath + '/' + file);
        // console.log(file);
        route.setRouter(app);
    }
});
// end bootstrap route






const normalizePort = (val) => {
    let port = parseInt(val, 10);

    if(isNaN(port)) {
        return val;
    }
    if(port >= 0) {
        return port;
    }
    return false;
}


// if Error occurred on server startup
const onError = () => {
    if(error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof port === "string" ? "pipe "+port : "port "+port;
    switch(error.code) {
        case "EACCESS": 
            console.log(bind + " requires elevated priviledges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.log(bind + " is already in use");
            process.exit(1);
            break;
        default: 
            throw error;
    }
}

//Success case on server startup
const onListening = () => {
    const address = server.address();
    const bind = typeof port === "string" ? "pipe "+port : "port "+port;
    console.log("Listening on "+bind);

    //initiating mongoose only when server is initialized
    // let db = mongoose.connect('mongodb://127.0.0.1:27017/HermonDB', { useMongoClient: true });
    let db = mongoose.connect(appConfig.db.uri, { useCreateIndex: true, useNewUrlParser: true });

}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});


//Mongoose error case
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err);
    logger.error(err, 'mongoose connection on error handler', "high");
    // process.exit(1);
});

//Mongoose success case
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);
        logger.error(err, 'mongoose connection open handler', "high");
    } else {
        console.log("database connection open success");
        // logger.info("database connection open", 'database connection open handler', "success");
    }
    //process.exit(1)
}); // enr mongoose connection open handler


//Normalizing Port
const port = normalizePort(process.env.PORT || "4000");
app.set("port", port);


// app.get("/", (req, res) => {
//     res.send("This is the Home page");
// });


// Routes
// app.use('/api/user', userRoutes);
// app.use('/api/event', eventRoutes);


//Global 404 Handler
app.use(errorHandler.notFoundHandler);


//Server Initiated
const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

//initializing socket
const socket = require('./app/libs/socketLib');
const socketServer = socket.setServer(server);



module.exports = app;