/**
 * Applikation för moment 3 i Backend-utveckling Mittuniversitetet
 * Rosali Johansson
 */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

//routes 
app.use("/api", authRoutes);