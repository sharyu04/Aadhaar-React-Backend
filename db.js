const mongoose = require('mongoose');
require('dotenv').config();
const mongoUri = process.env.mongoUri;

const connectToDb = () => {
    try{
        mongoose.connect(mongoUri)
        console.log("Connected to db");
    }
    catch{
        console.log("Database connection failed");
    }
}

module.exports = connectToDb;