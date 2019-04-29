let errorHandler = (err, req, res, next) => {
    console.log(`App level Error occurred: ${err}`);
    res.status(500).send(`App level Error occurred: ${err}`);
}
let notFoundHandler = (req, res, next) => {
    console.log("Route not found in the app");
    res.status(404).send("Route not found");
}

module.exports = {
    notFoundHandler : notFoundHandler,
    errorHandler: errorHandler
}