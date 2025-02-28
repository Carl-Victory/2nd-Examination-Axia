const jwt = require('jsonwebtoken'); //We require jwt, a module from installed dependencies

//Create token
const jwttoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'}
    )};

    //Export token
    module.exports = jwttoken;