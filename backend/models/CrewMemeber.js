const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const CrewMember = sequelize.define(
    "CrewMembers",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: [5,30]
            }
        },
        role: {
            type: DataTypes.ENUM,
            values: ['director', 'writer', 'actor']
        },
    }
);

module.exports = CrewMember;