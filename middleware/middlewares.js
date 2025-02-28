//Firstly, We require jwt, a module from installed dependencies
const jwt = require('jsonwebtoken');

//We require our user schema 
const userSchema = require('../models/usermodel');

//We require our dot env
require('dotenv').config();


const authmiddleware = async (req, res, next) => {
    // Get token from cookies (used in web apps)
    const token = req.cookies.token; 

    // We throw in an error if Token not found
    if (!token) {
        return res.status(401).json({ message: 'Please login to continue' }); 
    }

    try {
        // Verify token
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET); 

        // Return error if token is invalid
        if (!verifiedToken) {
            return res.status(403).json({ message: 'Invalid token' }); 
        }
        // Get user without password
        const user = await userSchema.findById(verifiedToken.id).select('-password'); 

        // Return if user is not found
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); 
        }

        // Attach user to request
        req.user = user; 

        // Continue to next middleware or route handler
        next(); 
    } catch (error) {
        console.error(error);//If process fails, display in our terminal
        //if process fails, respond with error status code and message to the client
        res.status(500).json({ message: 'Server error' }); 
    }
};

//Export created middleware
module.exports = authmiddleware;
