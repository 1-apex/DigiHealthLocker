const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const Router = require('./Routers/Routes');
const cors = require("cors");
const { temCotroller } = require('./controllers/DockterController');

const db = require('./utils/db');
const dotenv = require("dotenv");
//middle ware to handle the error and send responce in structured  way
const ErrorMiddleware = require('./middlewares/ErrorControlMiddleWare');
//To make use of the env variables

dotenv.config();
//useing the middelware to error handiling
app.use(express.json());
app.use(ErrorMiddleware);
app.use(Router);





db().then(() => {
    app.listen(port, () => {
        console.log(`Server is started at ${port}`);
    })
})
