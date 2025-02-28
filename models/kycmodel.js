// Import necessary modules
const mongoose = require('mongoose');


// KYC MODEL (ONE-TO-ONE WITH USER)
const kycSchema = new mongoose.Schema({
    // Each user can have only one KYC
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, 
    //User must have unique ID
    identityNumber: { type: String, required: true },
    //User's country required
    country: { type: String, required: true }
});

//model is exported for use in KYC CONTROLLER
module.exports = mongoose.model('KYC', kycSchema);
