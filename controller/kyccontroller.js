//Firstly, we mport necessary requirements
const kycSchema = require('../models/kycmodel');

// CREATE KYC (LINK TO USER)
const createkyc = async (req, res) => {
    try {
        //Destructure req.body to get the necessary input feilds
        const { identityNumber, country } = req.body;

        //We display an error if all required Kyc fields are not filled
        if (!identityNumber || !country) {
            return res.status(400).json({ message: 'All KYC fields are required' });
        }

        //Create a new kyc from the model and save
        const kyc = new kycSchema({ user: req.user._id, identityNumber, country });
        await kyc.save();

        //respond to the client with a suucess status code and message
        res.status(200).json({ message: 'KYC created successfully' });
    } catch (error) {
        console.error(error); //If process fails, display in our terminal
        //if process fails, respond with error status code and message to the client
        res.status(500).json({ message: 'Server error' });
    }
};

//Export created KYC
module.exports = createkyc; 
