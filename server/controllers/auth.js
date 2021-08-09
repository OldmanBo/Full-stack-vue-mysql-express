const mysql = require('mysql2');
const { db } = require('../db/config.js');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config();


const registerUser = (req, res) => {
    const { user_name, first_name, last_name, email, password, confirmPassword, bio, birth_date, phone_number } = req.body

    //User input check
    if (!user_name) {
        return res.status(400).json({ success: false, msg: 'User name required!' })
    }
    if (!first_name) {
        return res.status(400).json({ success: false, msg: 'First name required!' })
    }
    if (!last_name) {
        return res.status(400).json({ success: false, msg: 'Last name required!' })
    }
    if (!email) {
        return res.status(400).json({ success: false, msg: 'Email required!' })
    }
    if (!password) {
        return res.status(400).json({ success: false, msg: 'Password required!' })
    }
    if (!birth_date) {
        return res.status(400).json({ success: false, msg: 'Date of birth required!' })
    }

    const imgFile = req.file

    if (!imgFile) {
        return res.status(400).json({ success: false, msg: 'Please provide a profile image!' })
    }

    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error)
            return res.send(error)
        }
        if (results.length > 0) {
            return res.status(400).json({ success: false, msg: 'Sorry, this email is already in use, choose different one...' })
        } else if (password !== confirmPassword) {
            return res.status(400).json({ msg: 'Passwords do not match!' })
        }
        const hashedPassword = await bcrypt.hash(password, 8)

        db.query('INSERT INTO users SET ?', {
            user_name: user_name,
            first_name: first_name,
            last_name: last_name, email: email,
            email: email,
            password: hashedPassword,
            bio: bio,
            birth_date: birth_date,
            phone_number: phone_number,
            img: `${basePath}${fileName}`
        }, (error, results) => {
            if (error) {
                return res.status(400).json({ msg: 'An error occurred', error: error })
            }
            res.status(200).json({ msg: 'New user successfully registered', result: results })
        })
    })
};

const loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide both password and email' })
    }
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            return res.status(400).json({ msg: 'query error check: failed', error: error })
        }
        if (results.length < 1) {
            return res.status(404).json({ msg: 'Sorry, no user with that email' })
        }
        try {
            if (await bcrypt.compare(password, results[0].password)) {
                const { user_id, user_name } = results[0]
                const secret = process.env.JWT_SECRET
                const token = jwt.sign({ user_id, user_name }, secret, { expiresIn: '1w' })

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + 7 * 86400000
                    ),
                    httpOnly: true
                }

                res.cookie('blogs_jwt_cookie', token, cookieOptions)

                return res.status(200).json({ msg: 'Login successful', token, user: results })
            } else {
                return res.status(401).json({ msg: 'Wrong password!' })
            }

        } catch (error) {
            res.send(error)
            console.log(error)
        }
    })
}

const checkUser = (req, res) => {
    const token = req.cookies.blogs_jwt_cookie
    const secret = process.env.JWT_SECRET
    if (!req.cookies.blogs_jwt_cookie) {
        return res.status(403).json({
            user: {
                logedIn: false
            }
        })
    }
    const userID = jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(400).json({ msg: 'first error', error: err })
        }
        return decoded.user_id
    })
    res.status(200).json({
        user: {
            logedIn: true,
            user_id: userID
        }
    })

}

const logoutUser = (req, res) => {
    try {
        res.cookie('blogs_jwt_cookie', 'logout', {
            expires: new Date(Date.now() + 1),
            httpOnly: true
        })
        res.status(200).json({ success: true, msg: 'User successfully loged out' })
    } catch (error) {
        res.status(400).json({ success: false, msg: 'Somehting went wrong', error: error })
    }
}

module.exports = { registerUser, loginUser, logoutUser, checkUser };
