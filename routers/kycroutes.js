const { Router } = require("express"); //We require Router, an express function
const Krouter = Router(); //We assign it to a variable
const createkyc = require('../controller/kyccontroller'); //We require out createKyc variable from our kyc controller
const authmiddleware = require('../middleware/middlewares'); //we reuire our authmiddleware to authenticate our users

Krouter.post('/kyc', authmiddleware, createkyc); //endpoint route for creating a kyc

module.exports = Krouter; // We export to our server.js file


