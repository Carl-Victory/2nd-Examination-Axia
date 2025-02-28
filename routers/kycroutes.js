const { Router } = require("express");
const Krouter = Router();
const createkyc = require('../controller/kyccontroller');
const authmiddleware = require('../middleware/middlewares');

Krouter.post('/kyc', authmiddleware, createkyc);

module.exports = Krouter;


