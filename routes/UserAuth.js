const express = require('express');
const router = express.Router();
const User = require("../model/User");
const OtpObj = require("../model/Otp");
const otpGenerator = require('otp-generator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');
require('dotenv').config();

const JWT_secret = process.env.JWT_secret;

//create user
router.post("/create",async(req,res)=>{
    try{
        const user = new User({
            First_Name: req.body.First_Name ,
            Middle_Name: req.body.Middle_Name ,
            Last_Name: req.body.Last_Name ,
            Mobile_Number: req.body.Mobile_Number ,
            Aadhaar_no: req.body.Aadhaar_no ,
            Gender: req.body.Gender ,
            Date_Of_Birth: req.body.Date_Of_Birth ,
        })

        const result = user.save();

        res.status(400).json({result,user});

    }catch(error){
        console.log(error);
    }
})

//Get all documents
router.get('/getAll',async(req,res)=>{
    try{
        let users = await User.find();
        console.log(users);
        return res.status(400).json(users);
    }
    catch(error){
        console.log(error);
    }
})

//Generate otp
router.post('/userLogin',async(req,res)=>{
    const {Aadhaar_no} = req.body
    try {
        let user = await User.findOne({Aadhaar_no});
        if(!user){
            return res.status(400).json({error:"Invalid Credentials"});
        }
        

        const OTP = otpGenerator.generate(6,{
            digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false
        });

        console.log(user.Mobile_Number,OTP);

        const salt = await bcrypt.genSalt(10);
        const hashed_otp = await bcrypt.hash(OTP,salt);

        const result = await OtpObj.replaceOne({Aadhaar_no : user.Aadhaar_no},{Aadhaar_no : user.Aadhaar_no,Otp:hashed_otp,Mobile_No : user.Mobile_Number},{upsert:true})        

        return res.json({result,user,OTP});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})

//verify otp
router.post('/verifyOtp',async(req,res)=>{
    const {Aadhaar_no,Otp} = req.body;
    try {
        const otp_object = await OtpObj.findOne({Aadhaar_no});
        if(!otp_object){
            return res.status(400).json({error:"Invalid credentials"});
        }
        const otpCompare = await bcrypt.compare(Otp,otp_object.Otp);
        if(!otpCompare){
            return res.status(400).json({error : "Invalid Otp"});
        }
        
        const user = await User.findOne({Aadhaar_no});
        const data = {
            user:{
                id : user._id
            }
        }
        const authToken = jwt.sign(data,JWT_secret);

        res.json({data : data,authToken : authToken});


    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

//Login user
router.post("/getUser",fetchUser,async(req,res)=>{
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json(user);
        
    } catch (error) {
        res.status(400).json({error});
    }
})

module.exports = router