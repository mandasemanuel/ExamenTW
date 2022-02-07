const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Second = sequelize.define(
    "Seconds",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        field1: {
            type: DataTypes.STRING,
        },
        field2: {
            type: DataTypes.STRING,
        }
    }
);

module.exports = Second;