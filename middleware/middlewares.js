const jwt = require('jsonwebtoken');
const userSchema = require('../models/usermodel');
require('dotenv').config();

const authmiddleware = async (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies (used in web apps)

    if (!token) {
        return res.status(401).json({ message: 'Please login to continue' }); // Token not found
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify token

        if (!verifiedToken) {
            return res.status(403).json({ message: 'Invalid token' }); // Return if token is invalid
        }

        const user = await userSchema.findById(verifiedToken.id).select('-password'); // Get user without password

        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Return if user is not found
        }

        req.user = user; // Attach user to request
        next(); // Continue to next middleware or route handler
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' }); // Handle errors
    }
};

module.exports = authmiddleware;
