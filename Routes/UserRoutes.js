const express = require('express');
const User = require('../Server/Models/User');
const bcrypt = require('bcrypt');
const router = express.Router();


router.post('/submitUser', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400);
            res.send('Username already exists');
            return;
        }

        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hash,
        });

        await newUser.save();
        res.status(201).send('User data saved successfully! - test');
    } catch (err) {
        console.error('Error saving user data:', err);
        res.status(500).send(`failed`);
    }
});
module.exports = router;