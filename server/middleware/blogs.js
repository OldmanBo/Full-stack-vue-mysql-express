const mysql = require('mysql2');
const { db } = require('../db/config.js');
const jwt = require('jsonwebtoken');

const blogAuth = async (req, res, next) => {
    if (!req.cookies.blogs_jwt_cookie) {
        return res.status(401).json({ success: false, msg: 'User not logged in / No jwt token detected' })
    }
    const token = req.cookies.blogs_jwt_cookie
    const secret = process.env.JWT_SECRET
    const blogID = req.params.blog_id
    const userID = jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(400).json({ msg: 'first error', error: err })
        }
        return decoded.user_id
    })
    db.query('SELECT user_id FROM blogs where blog_id = ?', [blogID], (error, results) => {
        if (error) {
            req.msg = 'query error'
            next()
        }
        if (results.length < 1) {
            req.msg = 'wrong id'
            next()
        }
        if (results[0].user_id == userID) {
            req.msg = 'authorized'
            next()
        } else {
            req.msg = 'not authorized'
            next()
        }
    })
}

module.exports = { blogAuth }