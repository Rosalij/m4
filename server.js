/**
 * Applikation för moment 3 i Backend-utveckling Mittuniversitetet
 * Rosali Johansson
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');



const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());



//routes 
app.use("/api", authRoutes);

//protected routes
app.get('/api/protected', authenticateToken, (req, res) => {
  // This is a placeholder for a protected route
  res.json({ message: 'This is a protected route' });
});

//validate token 
async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("Token:", token); 
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = await jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = decoded.username;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});