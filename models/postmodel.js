// Import necessary modules
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    //The content of the post (limited to 280 characters)
    content: {type: String, maxlength: 280, required: true}, 
    //Username of the user who created the post
    username : {type: String, required: false}, 
    // ID of the user who created the post
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
});

//model is exported for use in POST CONTROLLER
module.exports = mongoose.model('Post', postSchema);


