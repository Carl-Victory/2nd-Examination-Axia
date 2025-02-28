//Firstly, we mport necessary requirements and modules
const userSchema = require('../models/usermodel'); //for our user model
const postSchema = require('../models/postmodel'); //for the post model
const kycSchema = require('../models/kycmodel'); //for the KYC model
const bcrypt = require('bcryptjs'); //for hashing our password
const jwttoken = require('../jwt/jwttoken'); //for creating our token
const { json } = require('express'); //.json requirement

//REGISTER A USER
const registerUser = async (req, res) => {
    //Destructure req.body to get the necessary input feilds
    const { username, email, password } = req.body;

    //We display an error if all required fields are not filled
    if (!username || !email || !password) {
        return res.status(400).json({message: 'Please fill in all fields'});
    }
    try {
        //We try to verify if email already exist
        const user = await userSchema.findOne({ email });
        if (user) {
        //Return an error message 
            return res.status(400).json({message: 'User already exists'});
        }
        //Encrypt the password using bycrpt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    //Create new user and save to database
        const newUser = new userSchema({...req.body, password: hashedPassword });
    await newUser.save();

    // we respond with a success status code and the message
    res.status(200).json({message: 'User created successfully'});
    } catch (error) {
        console.log(error);//If process fails, display in our terminal
        //if process fails, respond with error status code and message to the client
        res.status(500).json({message: 'Server error'});
    }}


//LOGIN A USER
const loginUser = async (req, res) => {
    //Destructure req.body to get the necessary input feilds
    const { email, password } = req.body;

    //We display an error if all required fields are not filled
    if (!email || !password) {
        return res.status(400).json({message: 'Please fill in all fields'});
    } try {
        //We try to verify if user exists by email
        const user = await userSchema.findOne({ email});
        if (!user) {

            //return an error message if user is not found
            return res.status(400).json({message: 'User does not exist'});
            } 
        //Compare if user's password matches with the password from the database
        const comparepassword = await bcrypt.compare(password, user.password);
        if (!comparepassword) {
            //return an error message if it doesnt match
            return res.status(400).json({message: 'Invalid password'});
        }
        //Generate the token which we will be sending to the browser
        const token = jwttoken(user._id);
        const { password: userPassword, ...userdata } = user.toObject();// Rename 'password' to avoid conflict. I encured an error here earlier.
        
        //We respond with a cookie that will be saved in the brower untill expiry
        res.cookie('token', token, {httpOnly: true, samesite: 'strict'});

        // we respond with a success status code and the message
        res.status(200).json({message: 'Login successful'});}
        catch (error) {
            console.log(error);//If process fails, display in our terminal
            //if process fails, respond with error status code and message to the client
            res.status(500).json({message: 'Server error'});
        }}




//DELETE USER
const deleteUser = async (req, res) => {
    // Authenticated user's ID
    const userId = req.user._id
try {
   //Delete all user's posts
   await postSchema.deleteMany({ user : userId });

    // Delete associated KYC
   await kycSchema.findOneAndDelete({ user: userId }); 

    // Delete user
    await userSchema.findByIdAndDelete(userId); 

    // we respond with a success status code and the message
    res.status(200).json({ message: 'User deleted successfully' });
} catch (error) {
    console.log(error);//If process fails, display in our terminal
    //if process fails, respond with error status code and message to the client
    res.status(500).json({message: 'Server Eroor'});
}}


    module.exports = {registerUser, loginUser, deleteUser};