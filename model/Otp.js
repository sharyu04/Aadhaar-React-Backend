const mongoose = require('mongoose');
const {Schema} = mongoose;

const otpSchema = new Schema({
    Aadhaar_no : {
        type : Number,
        required : true,
        unique : true
    },
    Otp : {
        type : String,
        required : true
    },
    Mobile_No : {
        type : Number,
        required : true
    },
    Created_At : {
        type : Date,
        default : Date.now,
        index : {expires : 300}
    }
});

Otp = mongoose.model('Otp',otpSchema);
module.exports = Otp;