const jsonwebtoken = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
   console.log("Decoded Token:", decoded);  if (err) {
    // Shows payload for debugging
  
      console.error("JWT Error:", err.message);
      return res.status(403).json({ message: "Invalid token", error: err.message });
    }  
    req.author = decoded.username; // Attach the decoded token to the request object
 // Make sure this exists in token payload
   
    next(); 
  });
}
module.exports = authenticateToken;
