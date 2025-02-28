const { Router } = require("express"); //We require Router, an express function
const router = Router(); //We assign it to a variable
const {registerUser, deleteUser, loginUser} = require("../controller/usercontroller"); //We require our variables from our user controller
const authmiddleware = require('../middleware/middlewares'); //we reuire our authmiddleware to authenticate our users


router.post('/register', registerUser); //endpoint route for creating a user
router.post('/login', loginUser); //endpoint route for logining in a user
router.delete('/delete/:id', authmiddleware, deleteUser); //endpoint route for deleting a user

module.exports = router; // We export to our server.js file