/**
 * Applikation för moment 4 i Backend-utveckling Mittuniversitetet
 * Rosali Johansson
 * 
 * Denna applikation är en RESTful API som använder Express.js och MongoDB för att hantera användarregistrering och inloggning.
 * Den använder JWT (JSON Web Tokens) för autentisering och skydd av vissa rutter.
 */


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
const authenticateToken = require('./authToken.js');


const mongoose = require('mongoose');
//MongoDB connection via Mongoose and .env file   
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

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});