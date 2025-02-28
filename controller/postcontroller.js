//Firstly, we mport necessary requirements
const postSchema = require('../models/postmodel');


//CREATE POST
const createPost = async(req, res) => {

    //Destructure req.body to get the necessary input feilds
    const { content } = req.body

    //We display an error if all required Post fields are not filled
    if (!content || content.length > 280){
        return res.status(401).json({message: 'Content must be between 1-280 characters'})};
    try {

        // We TRY to create a new post with user ID and username
        const post = new postSchema({user : req.user._id, username: req.user.username, content});
        
        // Save the post in the database
        await post.save(); 
        //We respond with a success status code and the created post
        res.status(200).json(post);
    } catch (error) {
        console.log(error);//If process fails, display in our terminal
        //if process fails, respond with error status code and message to the client
        res.status(500).json({ message: 'Server error' });
    }
}

//Export created Post
module.exports = createPost;