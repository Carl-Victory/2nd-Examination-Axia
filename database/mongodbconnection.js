const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGODB)
    } catch (error) {
        console.log(error);
    } console.log('Database connected');
}

module.exports = connectDB;