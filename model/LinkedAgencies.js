const mongoose = require("mongoose");
const {Schema} = mongoose;

const linkedAgenciesSchema = new Schema({
    Agency_Id : {
        type : String,
        required : true,
        unique : true
    },
    Agency_Name : {
        type : String,
        required : true
    },
    Agency_Api : {
        type : String,
        required : true,
        unique : true
    }
});

LinkedAgencies = mongoose.model('LinkedAgencies',linkedAgenciesSchema);
module.exports = LinkedAgencies;