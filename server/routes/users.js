const express = require('express');
const router = express.Router();
const { userAuth } = require('../middleware/users')

const { getAllUsers,
    getSingleUser,
    updateUser,
    delUser,
    searchUsers } = require('../controllers/users')

router.route('/').get(getAllUsers)
router.route('/:user_id').get(getSingleUser).put(userAuth, updateUser).delete(userAuth, delUser)
router.route('/search/results').get(searchUsers)

module.exports = router