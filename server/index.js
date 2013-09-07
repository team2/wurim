var express = require('express');
// var path = require('path');

var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
app.use(express.logger('dev'));

app.use(express.cookieParser());
app.use(express.session({ secret: 'i am not telling you' }));
app.use(express.bodyParser());


require('./live')(io);

server.listen(9001);

