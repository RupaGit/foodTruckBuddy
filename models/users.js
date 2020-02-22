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

    Users.associate = function (models) {
        // Associating FoodTruck with FoodTruckLocation
        // When a FoodTruck is deleted, also delete any associated FoodTruckLocation
        Users.hasMany(models.foodTruck, {
            onDelete: "cascade"
        });
    };

    return Users;
};