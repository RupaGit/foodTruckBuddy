var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
app.post("/api/foodTrucks", function(req, res) {
    console.log("Trying to insert"+req.body)
    db.foodTruck.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });
}