let ipLogger = (req, res, next) => {
    let remoteIp = req.connection.remoteAddress+'://'+ req.connection.remotePort;
    // let realIP = req.headers['X_REAL_IP'];
    console.log(req.method+ " Request made from "+remoteIp+" for "+req.originalUrl);
    next();
}

module.exports = {
    ipLogger: ipLogger
}