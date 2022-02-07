const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const First = sequelize.define(
    "First",
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

module.exports = First;