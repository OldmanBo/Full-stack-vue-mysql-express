const mysql = require('mysql2');
const { db } = require('../db/config.js');
const jwt = require('jsonwebtoken')

const getAllBlogs = (req, res) => {
    db.query('SELECT b.*, u.user_name AS written_by FROM blogs b JOIN users u ON b.user_id = u.user_id', (error, results) => {
        if (error) {
            return res.status(400).json({ success: false, msg: 'An error occurred', error: error })
        }
        res.status(200).json({ success: true, data: results })
    })
}

const getSingleBlog = (req, res) => {
    const blogID = req.params.blog_id
    db.query('SELECT b.*, u.user_name AS written_by, u.first_name, u.last_name FROM blogs b JOIN users u ON b.user_id = u.user_id WHERE b.blog_id = ? ', [blogID], (error, results) => {
        if (error) {
            return res.status(400).json({ success: false, msg: 'An error occurred', error: error })
        }
        if (results.length < 1) {
            return res.status(404).json({ success: false, msg: 'Sorry, no blog with that id' })
        }
        res.status(200).json({ success: true, data: results })
    })
}

const getAllUserBlogs = (req, res) => {
    const userID = req.params.user_id
    db.query('SELECT b.*, u.user_name AS written_by FROM blogs b JOIN users u ON b.user_id = u.user_id WHERE b.user_id = ? ', [userID], (error, results) => {
        if (error) {
            return res.status(400).json({ success: false, msg: 'An error occurred', error: error })
        }
        if (results.length < 1) {
            return res.status(404).json({ success: false, msg: 'Sorry, no blog with that id' })
        }
        res.status(200).json({ success: true, data: results })
    })
}

const createNewBlog = (req, res) => {
    const token = req.cookies.blogs_jwt_cookie
    const secret = process.env.JWT_SECRET
    const userID = jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(400).json({ success: false, msg: 'error decoding token', error: err })
        }
        return decoded.user_id
    })


    const date = new Date().toISOString()
    const date1 = date.slice(0, 10)
    const date2 = date.slice(11, 19)
    const dateFull = date1 + ' ' + date2

    const data = req.body
    data.user_id = userID
    data.date_created = dateFull

    if (!data.title) {
        return res.status(400).json({ success: false, msg: 'Title required!' })
    }
    if (!data.body_snippet) {
        return res.status(400).json({ success: false, msg: 'Blog snippet required!' })
    }
    if (!data.body) {
        return res.status(400).json({ success: false, msg: 'Blog text required!' })
    }

    db.query('INSERT INTO blogs SET ?', [data], (error, results) => {
        if (error) {
            return res.status(400).json({ success: false, msg: 'query error', error: error })
        }
        res.status(201).json({ success: true, msg: 'New blog created', results })
    })
}

const updateSingleBlog = (req, res) => {
    const blogID = req.params.blog_id
    if (req.msg == 'query error' || req.msg == 'wrong id' || req.msg == 'authorized' || req.msg == 'not authorized') {
        if (req.msg == 'query error') {
            return res.status(400).json({ success: false, msg: 'query error', error: error })
        } else if (req.msg == 'wrong id') {
            return res.status(404).json({ success: false, msg: 'Sorry, no blog with that id' })
        } else if (req.msg == 'authorized') {
            const data = req.body
            db.query('UPDATE blogs SET ? where blog_id = ?', [data, blogID], (error, results) => {
                if (error) {
                    return res.status(400).json({ success: false, msg: 'query error', error: error })
                }
                return res.status(201).json({ msg: "Blog updated", results })
            })
        } else if (req.msg == 'not authorized') {
            return res.status(401).json({ msg: 'User is not authorized. You are not allowed to edit blogs that are not made by you!' })
        }
    } else {
        res.status(400).json({ msg: "ERROR, something went wrong, try again later" })
    }
}

const deleteBlog = (req, res) => {
    const blogID = req.params.blog_id
    if (req.msg == 'query error' || req.msg == 'wrong id' || req.msg == 'authorized' || req.msg == 'not authorized') {
        if (req.msg == 'query error') {
            return res.status(400).json({ success: false, msg: 'query error', error: error })
        } else if (req.msg == 'wrong id') {
            return res.status(404).json({ success: false, msg: 'Sorry, no blog with that id' })
        } else if (req.msg == 'authorized') {
            db.query('DELETE FROM blogs WHERE blog_id = ?', [blogID], (error, results) => {
                if (error) {
                    return res.status(400).json({ success: false, msg: 'query error', error: error })
                }
                return res.status(201).json({ success: true, msg: "Blog deleted", results })
            })
        } else if (req.msg == 'not authorized') {
            return res.status(401).json({ success: false, msg: 'User is not authorized. You are not allowed to delete blogs that are not created by you!' })
        }
    } else {
        res.status(400).json({ success: false, msg: "ERROR, something went wrong, try again later" })
    }
}

const searchBlogs = (req, res) => {
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

    db.query('SELECT COUNT(*) AS blogs_num FROM blogs b JOIN users u ON b.user_id = u.user_id WHERE title LIKE ? OR body LIKE ? OR date_created LIKE ? OR u.user_name LIKE ? OR u.first_name LIKE ? OR u.last_name LIKE ?', [search, search, search, search, search, search], (error, results) => {
        if (error) {
            return res.status(400).json({ success: false, msg: 'An error occurred', error: error })
        }

        limit = parseInt(limit)
        const blogsNum = results[0].blogs_num
        const maxPages = Math.ceil(blogsNum / limit)
        const offset = (parseInt(page) - 1) * limit
        if (blogsNum < 1) {
            return res.status(404).json({ success: false, msg: 'Sorry, no blogs found with these search terms' })
        }
        if (maxPages < page) {
            res.status(404).json({ success: false, msg: `No more pages, the last page is number: ${maxPages}` })
        } else {
            db.query('SELECT b.*, u.user_name, u.first_name, u.last_name, u.user_name AS written_by FROM blogs b JOIN users u ON b.user_id = u.user_id WHERE title LIKE ? OR body LIKE ? OR date_created LIKE ? OR u.user_name LIKE ? OR u.first_name LIKE ? OR u.last_name LIKE ? LIMIT ? OFFSET ?', [search, search, search, search, search, search, limit, offset], (error, results) => {
                if (error) {
                    return res.status(400).json({ success: false, msg: 'An error occurred', error: error })
                }
                if (results.length < 1) {
                    res.status(404).json({ success: false, msg: 'Sorry, no blogs found with these search terms' })
                } else {
                    res.status(200).json({ success: true, data: results, aditional_info: { total_blogs: blogsNum, limit_blogs_per_page: limit, page: page, max_pages_with_current_limit: maxPages } })
                }
            })
        }

    })
}

module.exports = { getAllBlogs, getSingleBlog, createNewBlog, updateSingleBlog, deleteBlog, searchBlogs, getAllUserBlogs }


//'SELECT b.*, u.user_name AS written_by FROM blogs b JOIN users u ON b.user_id = u.user_id WHERE title LIKE ? OR body LIKE ? OR date_created LIKE ? LIMIT ? OFFSET ?', [search, search, search, limit, offset]