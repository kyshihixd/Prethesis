const express = require('express');
const User = require('../Server/Models/User');
const bcrypt = require('bcrypt');
const router = express.Router();
const path = require('path');

router.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname, '../Public/Login/login.html'));
});

router.post('/Login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(401).send("Incorrect username or password");
        }

        const match = await bcrypt.compare(password, existingUser.password);
        if (match) {
            req.session.regenerate((err) => {
                if (err) {
                    console.error("Session regeneration failed:", err);
                    return res.status(500).send("Server error");
                }
        
                req.session.userId = existingUser._id;
                req.session.username = existingUser.username;
                req.session.admin = existingUser.admin;
                return res.status(201).send("Correct credential, logging in");
            });
        } else {
            return res.status(401).send("Incorrect username or password");
        }
    } catch (err) {
        console.error('Error saving user data:', err);
        res.status(500).send("Server error");
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/Login'); // or send a JSON response
    });
});
module.exports = router;