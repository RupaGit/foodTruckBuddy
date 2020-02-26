// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // cms route loads foodie.html
  app.get("/customer", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/foodie.html"));
  });

  // foodTruck route loads selecttruck.html
  app.get("/foodTruck", function(req, res) {
    if(req.user){
      res.sendFile(path.join(__dirname, "../public/userDashboard.html"));
    }
    else{  
      res.sendFile(path.join(__dirname, "../public/login.html"));
    }
  });

  // redirect to Login page
  app.get("/logIn", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

   // redirect to Signup page
   app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // logout redirect to home page
  app.get("/logOut", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

};
