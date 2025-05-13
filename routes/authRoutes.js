/**
 * Routes for authentication
 */

const express = require('express');
const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        res.status(201).json({ message: "User registered successfully" });
    }

    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "server error" });
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        if(username === "Mattias" && password === "Johansson") {
            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(401).json({ error: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "server error" });
    }
});


module.exports = router;