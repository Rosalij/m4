/**
 * Routes for authentication
 */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user.js');
const Post = require('../models/post.js');
const authenticateToken = require('../authToken.js');




//get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

//store a new post
//protected route with authenticateToken middleware
router.post('/newpost', authenticateToken, async (req, res) => {
    try {
        //get data from request
        const textinput = req.body.textinput;
        const author = req.author;
        //validate input
        if (!textinput) {
            return res.status(400).json({ error: " textinput is required" });
        }

        const newPost = new Post({
            author: author,
            textinput
        });


        console.log("req.user:", req.user);

        //save post to database
        await newPost.save();
        res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
        console.error("Error during post creation:", error);
        res.status(500).json({ error: "Server error" });
    }
});

//get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});



//store a new user
router.post('/register', async (req, res) => {
    try {
        //get data from request
        const { username, password } = req.body;
        //validate input
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        //check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            //user already exists
            return res.status(400).json({ error: "Username already exists" });
        }

        //hash password with bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        //create new user   
        const newUser = new User({
            username: username,
            password: hashedPassword
        });
        e
        //save user to database 
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
        const user = await User.findOne({ username: username });
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
            //remove password from user object
            const userWithoutPassword = await User.findOne({ username }, { password: 0 });

            //send response with token
            const response = {
                message: "user logged in successfully",
                user: userWithoutPassword,
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