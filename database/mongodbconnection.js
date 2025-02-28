const mongoose = require('mongoose'); //We reuire mongoose a module from installed dependencies
require('dotenv').config(); //We require our .env

const connectDB = async (req, res) => {
    try {
        //We connect to Mongodb usinig the connection string 
        await mongoose.connect(process.env.MONGODB) 
    } catch (error) {
        console.log(error);//If process fails, display in our terminal
        //if process fails, respond with error status code and message to the client
    } console.log('Database connected');
}

//export mongodb connection function
module.exports = connectDB;