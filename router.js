
var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");
var commonHeaders = {'Content-Type' : 'text/html'};
var path = require('path');
var fs = require('fs');


/////////////////////////////////////////////////////
// Handel HTTP route GET / and POST i.e. Home
function home(request, response){

  console.log('request :', request.url);

  //extract file path from each request (initial and subsequent from html link tags)
  var filePath = '.' + request.url;
  if (filePath == './'){
      filePath = './index.html';
  };
  console.log('file path: ', filePath);

  //extracting extension name using path module and extname() method and converting to string with string() method
  var extensionName = String(path.extname(filePath)).toLowerCase();
  console.log('extensionName: ', extensionName);

  //defining default contentType as html
  var contentType = 'text/html';

  //creating object including all common  "accept" http header mime types with matching extention to header syntax
  var mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.woff': 'application/font-woff',
      '.ttf': 'applilcation/font-ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'application/font-otf',
      '.svg': 'application/image/svg+xml'
  };

  //using the extention / accept header object to asign the correct header syntax for this request to variable content type
  contentType = mimeTypes[extensionName];
  console.log('contenType: ', contentType);

  //if url == "/...nothing..." && GET
  if (request.url === "/") {
    if (request.method.toLowerCase() === "get" ){
  		//show search field
      response.writeHead(200, { 'Content-Type': contentType });
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    } else {
      //if url == "/...nothing..." && POST

      //get post data from body
      request.on("data", function(postBody){
      //extract user name
        var query = querystring.parse(postBody.toString());
        response.writeHead(303, {"Location": "/" + query.username});
        response.write(query.username);
        response.end();
      //send browser to username
        //redirect to /:username
      });

    }
   };
}


/////////////////////////////////////////////////////
// Handel HTTP route GET /:username i.e /chalkers
function user(request, response) {

  console.log('request :', request.url);

  //extract file path from each request (initial and subsequent from html link tags)
  var filePath = '.' + request.url;
  if (filePath == './'){
      filePath = './index.html';
  };
  console.log('file path: ', filePath);

  //extracting extension name using path module and extname() method and converting to string with string() method
  var extensionName = String(path.extname(filePath)).toLowerCase();
  console.log('extensionName: ', extensionName);

  //defining default contentType as html
  var contentType = 'text/html';

  //creating object including all common  "accept" http header mime types with matching extention to header syntax
  var mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.woff': 'application/font-woff',
      '.ttf': 'applilcation/font-ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'application/font-otf',
      '.svg': 'application/image/svg+xml'
  };

  //using the extention / accept header object to asign the correct header syntax for this request to variable content type
  contentType = mimeTypes[extensionName];
  console.log('contenType: ', contentType);





	//if url == "/..somehthing..."
  var username = request.url.replace("/", "");
  if (username === 'main.css'){
  	var fileContents = fs.readFileSync('./views/' + username, {encoding: "utf8"});
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(fileContents)
  } else if (username.length>0) {
    response.writeHead(200, { 'Content-Type': contentType });
    renderer.view("header", {}, response);

		//get json from Treehouse
    var studentProfile = new Profile(username);
			//on "end"
      studentProfile.on("end", function(profileJSON){
				//show profile

        //store the calues which we need
        var values = {
          avatarUrl: profileJSON.gravatar_url,
          username: profileJSON.profile_name,
          badgeCount:profileJSON.badges.length,
          javascriptPoints: profileJSON.points.JavaScript
        };
        //Simple response
        renderer.view("profile", values, response);
        renderer.view("footer", {}, response);
        response.end();
      }) ;

  			//on "error"
      studentProfile.on("error", function(error){
  				//show error
          renderer.view("error", {error: error.message}, response);
          renderer.view("search", {}, response);
          renderer.view("footer", {}, response);
          response.end();
      });

  }
}

module.exports.home = home;
module.exports.user = user;
