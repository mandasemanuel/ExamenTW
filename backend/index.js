"use strict";

const express = require('express');
const cors = require('cors')
const sequelize = require('./sequelize');

const app = express();
app.use(cors())
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use((error, request, response, next) => {
    console.error(`[ERROR]: ${error}`);
    response.status(500).json(error);
});

app.use("/app", require("./routes/movies"))

app.listen(8080, async () => {
    console.log('Server started on http://localhost:8080');
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true}).then( () => {
            console.log("All models were syncronized succesfully");
        })
        console.log("Connection has been established succesfully");
    } catch (err) {
        console.error("Unable to connect to the database: ", error);
    }
})