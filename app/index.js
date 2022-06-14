/*
*Primary file for the API
*
*/

var http = require('http');

var url = require('url');

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

    // send the response

    // log the request path
    
    res.end('Hello World....\n');

    console.log('Request received on path: ' + trimmedPath + ' with method: ' + method + ' and with these query string parameters ' , queryStringObject);
    console.log('Request recerived with these headers: ' , headers);
});


//start the server and have it listen on port 3000
server.listen(3000, function(){
    console.log('listening on port 3000..');
});

