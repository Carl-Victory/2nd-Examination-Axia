const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const connectDB = require('./database/mongodbconnection');
const router = require('./routers/userroutes');
const Prouter = require('./routers/postroutes');
const Krouter = require('./routers/kycroutes');
const app = express();
require('dotenv').config();

const port = process.env.PORT


//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', router, Prouter, Krouter);


//Database connection
connectDB()
  



//Port testing
app.get('/', (req, res) => {
    res.send('You found my port, congratulations')
});
app.listen(port, () => {console.log(`Server is running on port ${port}`);})
