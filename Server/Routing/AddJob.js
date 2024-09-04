const express = require('express');
const router = express.Router();
const User = require('../Model/model');
const jwt = require('jsonwebtoken');


router.get('/Job',async (req,res)=>{
    try {
        const currentUser = await User.findById(req.User.Id);
        if (!currentUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({data : currentUser.Jobs});
    } catch (error) {
        res.status(500).json({msg : 'server Failed'});
        console.log(err);
    }
    
})
router.post('/Job',async (req,res)=>{
    try{
     const {CompanyName,
    CompanyLogoURL,
    Position,
    Salary,
    JobType,
    RemoteOrOffice,
    JobLocation,
    Description,
    JobDescription,
    Skills ,
    AboutCompany,
    Information} = req.body;

    const newJob = {CompanyName,
        CompanyLogoURL,
        Position,
        Salary,
        JobType,
        RemoteOrOffice,
        JobLocation,
        Description,
        JobDescription,
        Skills ,
        AboutCompany,
        Information};

    
        const currentUser = await User.findById(req.User.Id);

        if (!currentUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Add the new job to the user's Jobs array
        currentUser.Jobs.push(newJob);

        // Save the updated user document
        await currentUser.save();
        res.json({data : currentUser.Jobs});
    }  


    catch(err){
        res.status(500).json({msg : 'server Failed'});
        console.log(err);
    }
});

router.put('/Job', async (req,res) => {
    try {
        const {CompanyName,
    CompanyLogoURL,
    Position,
    Salary,
    JobType,
    RemoteOrOffice,
    JobLocation,
    Description,
    JobDescription,
    Skills ,
    AboutCompany,
    Information} = req.body;

    const {JobId} = req.params;


        const currentUser = await User.findById(req.User.Id);

        if(!currentUser){
            res.status(404).json({msg : 'User not found'});
        }

        const jobIndex = currentUser.Jobs.findIndex(job => job._id.toString() === JobId);

        if(!jobIndex){
            res.json({msg : 'Job does not exist'});
        }

        currentUser.Jobs[jobIndex] = {CompanyName,
        CompanyLogoURL,
        Position,
        Salary,
        JobType,
        RemoteOrOffice,
        JobLocation,
        Description,
        JobDescription,
        Skills ,
        AboutCompany,
        Information};

        await currentUser.save();
        res.json({ data: currentUser.Jobs });

    }
    catch (error) {
        res.status(500).json({ msg: 'Server Failed' });
        console.log(err);
    }
        
})

module.exports = router;