var http = require('http');
var fs = require('fs');
var path = require('path');
http.createServer(function (request, response) {

  var filePath = '.' + request.url;
  if (filePath == './')
    filePath = './index.html';

  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  fs.stat(filePath, function(error, status){
    if (error) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end(error.code);
    } else {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          response.writeHead(500);
          response.end();
        }
        else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    }
  });

}).listen(8888);
