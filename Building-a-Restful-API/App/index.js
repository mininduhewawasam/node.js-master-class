/*
*Primary file for the API
*/

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer( function(req, res) {
    
    // get the URL and parse it
    var parsedUrl = url.parse(req.url, true);

    // get the path
    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    
    // get the query string as an object
    var queryStringObject = parsedUrl.query;

    // get the http method
    var method = req.method.toLowerCase();

    // get the header as an object
    var headers = req.headers;

    //get the payload if there is any
    var decoder = new StringDecoder('utf-8');
    
    var buffer = '';
    
    req.on('data', function(data) {
        buffer += decoder.write(data);
    });

    req.on('end', function() {
        buffer += decoder.end();

        // choose the handler this request should go to. if one is not found select not found handler
        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        //construct the data object to send to the handler
        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        // Route the request to the handler specified in the router
        chosenHandler(data, function(statusCode, payload) {

            // use the status code called back by the handler, or default to 200
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

            // use the payload called back by the handler, or default to empty object
            payload = typeof(payload) == 'object' ? payload : {};

            // Convert the payload to a string
            var payloadString = JSON.stringify(payload);

            // Return the response  
            res.writeHead(statusCode);

            res.end(payloadString);
            
            console.log('Returning this response: ', payloadString);
        });
    });
});


//start the server and have it listen on port 3000
server.listen(3000, function() {
    console.log('listening on port 3000..');
});

// Define the handler
var handlers = {};

handlers.sample = function(data, callback) {

    // callback and http status code, and a payload object
    callback(406, {'name': 'sample handler'});
}

handlers.notFound = function(data, callback) {
    callback(404);
}

//defining request router
var router = {
    'sample': handlers.sample
}