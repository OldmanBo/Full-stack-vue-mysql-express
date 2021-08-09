const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, checkUser } = require('../controllers/auth');
const { uploadOptions, FILE_TYPE_MAP } = require('../middleware/users')

router.route('/register').post(uploadOptions.single('image'), registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser)
router.route('/usercheck').get(checkUser)



module.exports = router;
