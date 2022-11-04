const env = require('../utils/environment');
const mongoose = require('mongoose');

const uri = `mongodb+srv://banhTheTomato:${env.MONGO_PASSWORD}@banhthetomato.3znncp3.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
    return mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'blog-auth'
        })
        .then(() => {
            console.log('DB connection successful');
        })
};

module.exports = connectDB;
