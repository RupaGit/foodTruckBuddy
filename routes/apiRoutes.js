var db = require("../models");
var bcrypt = require('bcrypt');
var passport = require("../config/passport");

// Routes
// =============================================================
module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.redirect("/foodTruck");
  });
  app.post("/api/signup", function (req, res) {
    //encrypting password with bcrypt
    db.users.create({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    }).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
  //
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  app.post("/api/foodTrucks", function (req, res) {
    console.log("Trying to insert" + req.body)
    db.foodTruck.create(req.body).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/foodTrucks/:id", function (req, res) {
    db.foodTruck.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });

// PUT route for updating posts
app.put("/api/foodTrucks", function(req, res) {
  db.foodTruck.update(
    req.body,
    {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
    res.json(dbPost);
  });
});




}
