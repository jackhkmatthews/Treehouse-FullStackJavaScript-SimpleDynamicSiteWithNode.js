var router = require("./router.js")

//PROBLEM: we need a simple way to look at a users badge account and JAvaScript points rom a web browser
//SOLUTION: Use Node.js to perform profile look ups and serve out template via HTTP

//Lets define a port we want to listen to
var PORT=8080;

// Create web server
var http = require('http');
var server = http.createServer(function (request, response){
  router.home(request, response);
  router.user(request, response);
  }).listen(PORT);
console.log("Server running at http://localhost:%s", PORT)



//4. Function that handels the reading of files and merge in value
	//read from file and get a string
		//merge value into string
