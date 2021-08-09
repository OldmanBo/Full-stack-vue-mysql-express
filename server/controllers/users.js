const mysql = require('mysql2');
const { db } = require('../db/config.js');
const path = require('path')
const fs = require('fs')


const getAllUsers = (req, res) => {
    db.query('SELECT user_id, user_name, first_name, last_name, email, bio, birth_date, phone_number, img FROM users', (error, results) => {
        if (error) {
            return res.status(400).json({ success: false, msg: 'An error occurred', error: error })
        }
        res.status(200).json({ success: true, data: results })
    })
}

const getSingleUser = (req, res) => {
    const userID = req.params.user_id
    db.query('SELECT user_id, user_name, first_name, last_name, email, bio, birth_date, phone_number, img FROM users WHERE user_id = ?', [userID], (error, results) => {
        if (error) {
            return res.status(400).json({ success: false, msg: 'An error occurred', error: error })
        }
        if (results.length < 1) {
            return res.status(404).json({ success: false, msg: 'Sorry, no user with that id' })
        }
        res.status(200).json({ success: true, data: results[0] })
    })
}

const updateUser = async (req, res) => {
    const reqUserID = req.params.user_id
    const data = req.body

    if (req.userAuthorized) {
        const { user_name, first_name, last_name, email, password, birth_date } = req.body

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
        if (!birth_date) {
            return res.status(400).json({ success: false, msg: 'Date of birth required!' })
        }

        db.query('SELECT * FROM users WHERE user_id = ?', [reqUserID], (error, results) => {
            if (error) {
                return res.status(400).json({ msg: 'query error', error: error })
            }
            if (results.length < 1) {
                return res.status(404).json({ msg: 'Sorry, no user with that id' })
            }
            db.query('UPDATE users SET ? WHERE user_id = ?', [data, reqUserID], (error, results) => {
                if (error) {
                    return res.status(400).json({ msg: 'query error', error: error })
                }
                res.status(201).json({ msg: "User updated", results })
            })
        })

    }
    else {
        res.status(401).json({ msg: 'user is not authorized' })
    }
}

const delUser = (req, res) => {
    const reqUserID = req.params.user_id
    let userImg = '';
    if (req.userAuthorized) {
        db.query('SELECT img FROM users WHERE user_id = ?', [reqUserID], (error, results) => {
            if (error) {
                return res.status(400).json({ msg: 'query error', error: error })
            }
            if (results.length < 1) {
                return res.status(404).json({ msg: 'Sorry, no user with that id' })
            }

            const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`
            userImg = results[0].img
            const imgName = userImg.substring(userImg.length, basePath.length)

            db.query('DELETE FROM users WHERE user_id = ?', [reqUserID], (error, results) => {
                if (error) {
                    return res.status(400).json({ msg: 'query error', error: error })
                }
                const filePath = path.resolve('./', 'public', 'uploads', imgName);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        throw err
                    }
                    console.log(`${filePath} -- was deleted`);
                })
                res.status(201).json({ msg: "User deleted", results })
            })
        })
    }
    else {
        res.status(200).json({ msg: 'user is not authorized' })
    }

}

const searchUsers = (req, res) => {
    let limit = 5
    let page = 1
    const regExString = '%'
    let search = '%%'

    if (req.query.limit) {
        limit = req.query.limit
    }
    if (req.query.page) {
        page = req.query.page
    }
    if (req.query.search) {
        search = regExString.concat(req.query.search, regExString)
    }

    db.query('SELECT COUNT(*) AS users_num FROM users u WHERE u.user_name LIKE ? OR u.first_name LIKE ? OR u.last_name LIKE ? OR u.bio LIKE ?', [search, search, search, search], (error, results) => {
        if (error) {
            return res.status(400).json({ success: false, msg: 'An error occurred', error: error })
        }

        limit = parseInt(limit)
        const usersNum = results[0].users_num
        const maxPages = Math.ceil(usersNum / limit)
        const offset = (parseInt(page) - 1) * limit

        if (results[0].users_num < 1) {
            return res.status(404).json({ success: false, msg: 'Sorry, no users found with these search terms' })
        }
        if (maxPages < page) {
            res.status(404).json({ success: false, msg: `No more pages, the last page is number: ${maxPages}` })
        } else {
            db.query('SELECT user_id, user_name, first_name, last_name, email, bio, birth_date, phone_number, img FROM users WHERE user_name LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR bio LIKE ? LIMIT ? OFFSET ?', [search, search, search, search, limit, offset], (error, results) => {
                if (error) {
                    return res.status(400).json({ success: false, msg: 'An error occurred', error: error })
                }
                if (results.length < 1) {
                    res.status(404).json({ success: false, msg: 'Sorry, no users found with these search terms' })
                } else {
                    res.status(200).json({ success: true, data: results, aditional_info: { total_users: usersNum, limit_users_per_page: limit, page: page, max_pages_with_current_limit: maxPages } })
                }
            })
        }

    })
}

module.exports = { getAllUsers, getSingleUser, updateUser, delUser, searchUsers }


// public\uploads\small_screens_background.png-1628003712920.png
// const filePath = path.resolve('./', 'public', 'uploads');