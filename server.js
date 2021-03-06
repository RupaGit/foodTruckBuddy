// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var passport = require("passport");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var env = require('dotenv');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 4080;

// Requiring our models for syncing
var db = require("./models");

// var initPassport = require("./passport-config.js");
// initPassport(passport);


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

app.use(passport.initialize());

app.use(passport.session()); 

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/apiRoutes.js")(app);
require("./routes/loginRoute.js")(app);
require("./routes/htmlRoutes.js")(app);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
