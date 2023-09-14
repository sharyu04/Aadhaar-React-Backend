const express = require("express");
const router = express.Router();
const LinkedAgencies = require("../model/LinkedAgencies");

//Register the agency
router.post("/registerAgency",async(req,res)=>{
    const {Agency_Id,Agency_Name,Agency_Api} = req.body;
    try {
        console.log("In try");
        const agency = new LinkedAgencies({
            Agency_Id : Agency_Id,
            Agency_Name : Agency_Name,
            Agency_Api : Agency_Api
        });
        const result = agency.save();  
        res.status(200).json(agency);   
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }

});

module.exports = router;