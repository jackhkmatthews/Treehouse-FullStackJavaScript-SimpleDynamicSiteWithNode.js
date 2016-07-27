//PROBLEM: we need a simple way to look at a users badge account and JAvaScript points rom a web browser
//SOLUTION: Use Node.js to perform profile look ups and serve out template via HTTP

//1. Create web server

//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
var PORT=8080; 

//Create a server
var server = http.createServer(function (request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}).listen(PORT);
console.log("Server listening on: http://localhost:%s", PORT)

// , function(){
//     //Callback triggered when server is successfully listening. Hurray!
//     console.log("Server listening on: http://localhost:%s", PORT);
// });

//2. Handel HTTP route GET / and POST i.e. Home
	//if url == "/...nothing..." && GET
		//show search field
	//if url == "/...nothing..." && POST
		//redirect to /:username


//3. Handel HTTP route GET /:username i.e /chalkers
	//if url == "/..somehthing..."
		//get json from Treehouse
			//on "end"
				//show profile
			//on "error"
				//show error

//4. Function that handels the reading of files and merge in value
	//read from file and get a string
		//merge value into string 