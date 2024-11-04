// create web server
// create a web server that will respond to the comments, and save the comments to the file

// node.js modules
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

// my modules
var comments = require('./comments');

// create server
http.createServer(function(request, response) {
  var url_parts = url.parse(request.url, true);
  var pathname = url_parts.pathname;
  var query = url_parts.query;

  if (pathname == '/add_comment') {
    comments.addComment(query.comment);
    response.end();
    return;
  }

  if (pathname == '/get_comments') {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify(comments.getComments()));
    response.end();
    return;
  }

  // serve static files
  var filename = path.join(process.cwd(), pathname);
  fs.exists(filename, function(exists) {
    if (!exists) {
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.write('404 Not Found\n');
      response.end();
      return;
    }

    response.writeHead(200);
    fs.createReadStream(filename).pipe(response);
  });
}).listen(8080);


