/**
 * Routes for authentication
 */
require('dotenv').config();
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

//connect to the database
const db = new sqlite3.Database(process.env.DATABASE, (err) => {
    if (err) {
        console.error("Error connecting to the database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        //validate input
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }


        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        //check if user already exists

        const sql = `insert into users (username, password) values (?, ?)`;
        db.run(sql, [username, hashedPassword], function (err) {

            if (err) {
                res.status(400).json({ message: "Error inserting user" });
            }
            else {
                res.status(201).json({ message: "User registered successfully" });
            }
        });
    }
 
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "server error" });
    }
})

router.post('/login', async (req, res) => {
    try {

        const { username, password } = req.body;
        //validate input
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        //check if user exists
        const sql = `SELECT * FROM users WHERE username = ?`;
        db.get(sql, [username], async (err, row) => {
            if (err) {
                res.status(400).json({ message: "Error authenticating user.." });
            }
            else if (!row) {
                res.status(401).json({ message: "Invalid username or password" });
            }
            else {
                //user exists
                //compare password
                const passwordMatch = await bcrypt.compare(password, row.password);
                if (!passwordMatch) {
                    //password doesnt match
                    res.status(401).json({ message: "Invalid username or password" });
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
            }
        });
        //if error
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "server error" });
    }
}
);


module.exports = router;