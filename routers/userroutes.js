const { Router } = require("express");
const router = Router();
const {registerUser, deleteUser, loginUser} = require("../controller/usercontroller");
const authmiddleware = require('../middleware/middlewares');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete/:id', authmiddleware, deleteUser);

module.exports = router;