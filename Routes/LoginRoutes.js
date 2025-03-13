const express = require('express');
const User = require('../Server/Models/User');
const bcrypt = require('bcrypt');
const router = express.Router();


router.post('/LoginUser', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            const match = await bcrypt.compare(password, existingUser.password);
            if (match === true) {
                res.status(201).send("Correct credential, logging in");
            }
        }
        else {
            res.status(500).send(`Incorrect username or password`);
        }

    } catch (err) {
        console.error('Error saving user data:', err);
        res.status(500).send(`failed`);
    }
});
module.exports = router;