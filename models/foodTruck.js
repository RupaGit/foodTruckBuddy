module.exports = function (sequelize, DataTypes) {
    var FoodTruck = sequelize.define("foodTruck", {
        truckName: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2, 50],
            trim: true,
        },

        twitterHandle: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2, 50],
            trim: true,
        },

        cuisine: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2, 50],
            trim: true,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2, 1024],
            trim: true,
        }
    });

    FoodTruck.associate = function (models) {
        // Associating FoodTruck with FoodTruckLocation
        // When a FoodTruck is deleted, also delete any associated FoodTruckLocation
        FoodTruck.hasMany(models.foodTruckLocation, {
            onDelete: "cascade"
        });
    };

    return FoodTruck;
};