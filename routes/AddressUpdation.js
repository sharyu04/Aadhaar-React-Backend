const express = require("express");
const router = express.Router();
const LinkedAgencies = require('../model/LinkedAgencies');
const User = require('../model/User');

//find the api of all the selected id
router.post("/getAgencyData/:userId", async(req,res)=>{
    try {
        
        const currentUser = await User.findById("req.params.userId");
        const agencies = await Promise.all(
            currentUser.Linked_Agencies.map((agencyId)=>{
                return LinkedAgencies.find({Agency_Id:agencyId});
            })
        );
        res.status(200).json(agencies);

    } catch (error) {
        res.status(500).json({error:error});
    }
})