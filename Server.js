var express = require('express');
var app = express();
var httpServer; 
// var io = require('socket.io')(httpServer);

// =============
// Configuration
// =============
var port                = 3001;
var requireSecureServer = false;


// =============
// Setup Server
// =============

httpServer = require('http').Server(app);

// Some debugging
httpServer.listen(port, function () {
  console.log('Server','ServerId',"Listening on * at port " + port);
});

// Directory
app.use(express.static(__dirname));

app.get('/*/*', function(req, res){
	// var match = req.url.match('/(\S+)/(\S+)[/?$]/');
	//var match = req.url.match(/\/(\S+)\/(\S+)(\/|$)+/);
	// var match = req.url.match(/\/(\S+)\/(\S+)/);
	// console.log(match[1]," ",match[2]);
	console.log("goodbuy: " + req.url);
	// var urlParse = url.parse(req.url);
	// ignore the company name and room name.
	companyName = 'a';
	roomName = 'b';
	res.sendFile('index.html');

	/* 
	if ( (isUser && authorizedUser(userId,companyName,roomname)) ||
	     (isCamera && authorizedCamera(cameraId,compnayName,roomname)) ) {
   		res.sendFile(path.join(__dirname,'/../Public/index.html'));
   	} else {
   	    res.send("Not Authorized");
   	}
   	*/
});
 
// Not being used at all.
app.get('/', function(req, res){
  console.log("hello" + req.url);
  res.sendFile(__dirname + '/../Public/index.html');
});


