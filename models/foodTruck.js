module.exports = function (sequelize, DataTypes) {
    var FoodTruck = sequelize.define("FoodTruck", {
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
        rating: {
            type: DataTypes.STRING,
            allowNull: false,
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
        FoodTruck.hasMany(models.FoodTruckLocation, {
            onDelete: "cascade"
        });
    };
    FoodTruck.associate = function (models) {
        // We're saying that a FoodTruckLocation should belong to a FoodTruck
        // A FoodTruckLocation can't be created without an Author due to the foreign key constraint
        FoodTruck.belongsTo(models.users, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return FoodTruck;
};