const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Movie = sequelize.define(
    "Movie",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            validate: {
                len: [3,30]
            }
        },
        category: {
            type: DataTypes.ENUM,
            values: ['action', 'comedy', 'horror']
        },
        releaseDate: {
            type: DataTypes.DATE
        }
    }
);

module.exports = Movie;