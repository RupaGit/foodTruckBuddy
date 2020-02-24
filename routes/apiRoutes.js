var db = require("../models");
var bcrypt = require('bcrypt');


// Routes
// =============================================================
module.exports = function (app) {
  app.post("/api/signup", function (req, res) {
    //encrypting password with bcrypt
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
      db.users.create({
        userName: req.body.userName,
        email: req.body.email,
        password: hash
      }).then(function (dbPost) {
        res.json(dbPost);
      });
    });
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
    }).then(function (dbPost){
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
};

