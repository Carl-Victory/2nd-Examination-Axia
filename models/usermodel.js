// Import necessary modules
const mongoose = require('mongoose');


// USER MODEL
const userSchema = new mongoose.Schema({
    //Username required
    username: { 
        type: String, 
        required: true 
    },
    //Unique email is required of user 
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    //Unique password is required of user
    password: { 
        type: String, 
        required: true 
    },
    // Link to KYC, one-to-one relationship
    kyc: { 
        type: mongoose.Schema.Types.ObjectId, ref: "KYC" 
    },
    //Link to posts. One-to-Many relationship
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }], 
}, 
//We time stamp to know exactly they register, and when changes are made in the model
{ timestamps: true });

//model is exported for use in USER CONTROLLER
module.exports = mongoose.model('User', userSchema); 