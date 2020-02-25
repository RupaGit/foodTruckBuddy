var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("users", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2, 50],
            trim: true,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2, 50],
            trim: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2, 50],
            trim: true,
        }
    });
    //Adding hook to hash the password
    Users.addHook('beforeCreate', function(users){
        var salt = bcrypt.genSaltSync();
        users.password = bcrypt.hashSync(users.password, salt);
    });
    Users.prototype.validPassword = function(password){
        return bcrypt.compareSync(password, this.password);
    }
    Users.associate = function (models) {
        // Associating FoodTruck with FoodTruckLocation
        // When a FoodTruck is deleted, also delete any associated FoodTruckLocation
        Users.hasMany(models.foodTruck, {
            onDelete: "cascade"
        });
    };

    return Users;
};