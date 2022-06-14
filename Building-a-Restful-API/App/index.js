/*
*Primary file for the API
*/

var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer(function(req, res) {
    
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

        res.end('Hello World 222\n');

        console.log('Request received with this payload: ', buffer);
    });

    // send the response

    // log the request path
    
    res.end('Hello World....\n');

    console.log('Request received on path: ' + trimmedPath + ' with method: ' + method + ' and with these query string parameters ' , queryStringObject);

    console.log('Request received with these headers: ' , headers);
});


//start the server and have it listen on port 3000
server.listen(3000, function(){
    console.log('listening on port 3000..');
});

