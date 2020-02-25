var db = require("../models");
var bcrypt = require('bcrypt');
// Routes
// =============================================================
module.exports = function (app) {
  app.post("/api/login", function (req, res) {
      var username = req.body.email;
      var password = req.body.password;
    passport.use(new LocalStrategy(
        function(username, password, done) {
          db.users.findOne({ email: username }, function(err, user) {
            if (err) { return done(err); }
            if (!email) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (!email.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, email);
          });
        }
      ));
});
}