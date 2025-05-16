/**
 * Routes for authentication
 */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../install.js');


router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        //validate input
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }




        //check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        //create new user   
        const newUser = new User({
            username: username,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Server error" });
    }
});


//login route
router.post('/login', async (req, res) => {
    try {

        const { username, password } = req.body;
        //validate input
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        //check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        //compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            //password doesnt match
            return res.status(401).json({ message: "Invalid username or password" });
        } else {
            //password does match
            //create token   
            const payload = { username: username };
            const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            const response = {
                message: "user logged in successfully",
                token: token,
            }
            res.status(200).json(response);
        }

        //if error
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "server error" });
    }
});


module.exports = router;