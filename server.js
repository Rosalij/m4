/**
 * Applikation för moment 4 i Backend-utveckling Mittuniversitetet
 * Rosali Johansson
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const authenticateToken = require('./authToken.js');

const mongoose = require('mongoose');
//MongoDB connection via Mongoose   
mongoose.connect(process.env.DATABASE, {
})  
.then(() => console.log("MongoDB database connected"))
.catch((err) => console.error("MongoDB connection error:", err));

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


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});