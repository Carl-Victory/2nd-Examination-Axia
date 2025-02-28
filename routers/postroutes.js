const { Router } = require("express");
const Prouter = Router();
const createPost = require('../controller/postcontroller');
const authmiddleware = require('../middleware/middlewares');

Prouter.post('/post', authmiddleware, createPost);

module.exports = Prouter;