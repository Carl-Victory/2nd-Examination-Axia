const { Router } = require("express");//We require Router, an express function
const Prouter = Router();//We assign it to a variable
const createPost = require('../controller/postcontroller'); //We require out create post variable from our post controller
const authmiddleware = require('../middleware/middlewares'); //we reuire our authmiddleware to authenticate our users

Prouter.post('/post', authmiddleware, createPost); //endpoint route for creating a post

module.exports = Prouter; // We export to our server.js file