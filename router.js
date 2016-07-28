var Profile = require("./profile.js");




// Handel HTTP route GET / and POST i.e. Home
function home(request, response){
  //if url == "/...nothing..." && GET
  if (request.url === "/") {
		//show search field
    response.write("Header\n");
    response.write("Search\n");
    response.end("Footer\n");
    };
  //if url == "/...nothing..." && POST
  	//redirect to /:username
}

// Handel HTTP route GET /:username i.e /chalkers
function user(request, response) {
	//if url == "/..somehthing..."
  var username = request.url.replace("/", "");
  if (username.length>0) {
    response.write("Header\n");

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
        response.write(values.username + " has " + values.badgeCount + " badges\n");
        response.end("Footer\n");
      }) ;

  			//on "error"
      studentProfile.on("error", function(error){
  				//show error
          response.write(error.message + "\n");
          response.end("Footer\n");
      });

  }
}

module.exports.home = home;
module.exports.user = user;
