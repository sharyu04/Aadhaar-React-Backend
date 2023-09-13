const connectToMongo = require('./db');
const express = require('express');
require('dotenv').config();

const router = express.Router();
const User = require("./model/User");
const OtpObj = require("./model/Otp");
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

connectToMongo();
const port = process.env.port || 5000;

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello World!")
})


app.use('/api/UserAuth', require('./routes/UserAuth'))


app.listen(port,()=>{
    console.log("App listning on port ",port);
})