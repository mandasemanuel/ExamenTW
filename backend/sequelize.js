const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './sqlite/database.db',
    define: {
		timestamps: false
	}
});

sequelize.sync({alter: true}).then( () => {
    console.log("All models were syncronized succesfully");
})

module.exports = sequelize;