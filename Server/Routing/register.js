const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Model/model');

router.post('/Sign', async (req, res) => {
    const { Name, Email, Mobile, Password } = req.body;

    try {
        const existingUser = await User.findOne({ UserEmail: Email });

        if (existingUser) {
            return res.status(409).json({ msg: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);
        const newUser = new User({
            UserName: Name,
            UserEmail: Email,
            UserMobile: Mobile,
            UserPassword: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ msg: 'Account created' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const existingUser = await User.findOne({ UserEmail: Email });

        if (!existingUser) {
            return res.status(404).json({ msg: "Email does not exist" });
        }

        const comparePassword = await bcrypt.compare(Password, existingUser.UserPassword);

        if (!comparePassword) {
            return res.status(401).json({ msg: "Incorrect password" });
        }

        const token = jwt.sign({ id: existingUser._id },'YOUR_SECRET_KEY', { expiresIn: '1h' });
        res.status(200).json({ Token: token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
