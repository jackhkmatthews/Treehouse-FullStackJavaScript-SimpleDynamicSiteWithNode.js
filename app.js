//PROBLEM: we need a simple way to look at a users badge account and JAvaScript points rom a web browser
//SOLUTION: Use Node.js to perform profile look ups and serve out template via HTTP

//Lets define a port we want to listen to
var PORT=8080;

//1. Create web server
var http = require('http');
var server = http.createServer(function (request, response){
  homeRoute(request, response);
  }).listen(PORT);
console.log("Server running at http://localhost:%s", PORT)

//2. Handel HTTP route GET / and POST i.e. Home
function homeRoute(request, response){
  //if url == "/...nothing..." && GET
  if (request.url === "/") {
		//show search field
    response.write("Header\n");
    response.write("Search\n");
    response.end("Footer\n");
  //if url == "/...nothing..." && POST
  	//redirect to /:username
};
}




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
