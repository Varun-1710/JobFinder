const express = require('express');
const router = express.Router();
const User = require('../Model/model');

router.get('/Main', async (req, res) => {
    try {
        const users = await User.find();
        const companies = [];

        users.forEach((user) => {
            companies.push(...user.Jobs);  // Flattening the Jobs array into companies
        });

        res.status(200).json({data :  companies });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
        console.log(err);  // Correctly logging the error
    }
});

module.exports = router;
