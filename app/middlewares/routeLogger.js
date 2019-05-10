let ipLogger = (req, res, next) => {
    let remoteIp = req.connection.remoteAddress+'://'+ req.connection.remotePort;
    // let realIP = req.headers['X_REAL_IP'];
    // console.log(req.method+ " Request made from "+remoteIp+" for "+req.originalUrl);
    if (req.method === 'OPTIONS') {
        var headers = {};
        // IE8 does not allow domains to be specified, just the *
        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = true;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, authToken";
        res.writeHead(200, headers);
        res.end();
    } else {

        // enable or disable cors here 
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authToken");
        //console.log(res.header)
        // end cors config

        next();
    }
}

module.exports = {
    ipLogger: ipLogger
}