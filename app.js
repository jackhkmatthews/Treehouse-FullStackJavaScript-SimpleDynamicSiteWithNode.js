var router = require("./router.js");
var http = require('http');
var fs = require('fs');
var path = require('path');


//Lets define a port we want to listen to
var PORT=8080;

// Create web server
http.createServer(function (request, response){
           router.home(request, response);
           router.user(request, response);
    }).listen(PORT);
console.log("Server running at http://localhost:%s", PORT)



//4. Function that handels the reading of files and merge in value
	//read from file and get a string
		//merge value into string
