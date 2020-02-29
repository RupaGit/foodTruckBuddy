module.exports = function (sequelize, DataTypes) {
    var FoodTruckLocation = sequelize.define("foodTruckLocation", {

        location: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [2, 100],
            trim: true,
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    });

    FoodTruckLocation.associate = function (models) {
        // We're saying that a FoodTruckLocation should belong to a FoodTruck
        // A FoodTruckLocation can't be created without an Author due to the foreign key constraint
        FoodTruckLocation.belongsTo(models.foodTruck, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return FoodTruckLocation;
};