var querystring = require ("querystring");
var Profile = require("./profile.js");
var renderer = require("./renderer.js")
var commonHeaders = "{'Content-Type': 'text/html'}"


// Handel HTTP route GET / and POST i.e. Home
function home(request, response){
  //if url == "/...nothing..."
  if (request.url === "/") {
    // && GET
    if (request.method.toLowerCase() === "get"){
  		//show search field
      response.writeHead(200, commonHeaders);
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    } else {
      // && POST
      request.on("data", function (postRequestBody){
        //extract username
        var query = querystring.parse(postRequestBody.toString());
        //redirect to username url
        response.writeHead(303, {'Location':'/' + query.username});
        response.end();
      })
    }
  }
}

// Handel HTTP route GET /:username i.e /chalkers
function user(request, response) {
	//if url == "/..somehthing..."
  var username = request.url.replace("/", "");
  if (username.length>0) {
    response.writeHead(200, commonHeaders);
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
