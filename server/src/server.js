require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser')
const express = require('express');

const app = express();
const connectDB = require('./config/connectDB');
const apiRouterV1 = require('./routes/v1/v1.routes');
const handleError = require('./utils/handleError')

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
            origin: 'http://localhost:3000',
            credentials: true,
            methods: ['GET','HEAD','PUT','PATCH','POST','DELETE']
        })
    );
    app.use(helmet());
    app.use(cookieParser())

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.use('/api/v1', apiRouterV1);

    // handle error
    app.use(handleError)

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};
