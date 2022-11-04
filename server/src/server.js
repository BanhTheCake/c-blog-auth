require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser')
const express = require('express');

const app = express();
const connectDB = require('./config/connectDB');
const apiRouterV1 = require('./routes/v1/v1.routes');

const port = process.env.PORT || 8017;

connectDB()
    .then(() => bootServer())
    .catch((err) => {
        console.log(err);
        process.exit();
    });

const bootServer = () => {
    // config middleware
    app.use(
        cors({
            credentials: true,
            origin: '*',
        })
    );
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser())

    // Routes
    app.use('/api/v1', apiRouterV1);

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};
