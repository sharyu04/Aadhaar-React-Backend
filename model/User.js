const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    First_Name : {
        type : String,
        required : true
    },
    Middle_Name : {
        type : String
    },
    Last_Name : {
        type : String,
        required : true
    },
    Mobile_Number : {
        type : Number,
        required : true
    },
    Pre_Enrollment_Id : {
        type : Number
    },
    Aadhaar_no : {
        type : Number,
        required : true,
        unique : true
    },
    Gender : {
        type : String,
        enum: ['male', 'female'],
        required : true
    },
    Date_Of_Birth : {
        type : Date,
        required : true
    },
    Address : {
        Address_Line_1 : {
            type : String,
        },
        Address_Line_2 : {
            type : String
        },
        City:{
            type : String,
        },
        State : {   
            type : String,
        }
    },
    Linked_Agencies : [{
        type : Array
    }]
});

User = mongoose.model('User',userSchema);

module.exports = User;
