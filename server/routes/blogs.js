const express = require('express');
const router = express.Router();

const { getAllBlogs, getSingleBlog, createNewBlog, updateSingleBlog, deleteBlog, searchBlogs, getAllUserBlogs } = require('../controllers/blogs')
const { blogAuth } = require('../middleware/blogs')

router.route('/').get(getAllBlogs).post(createNewBlog)
router.route('/search/results').get(searchBlogs)
router.route('/search/:user_id').get(getAllUserBlogs)
router.route('/:blog_id').get(getSingleBlog).put(blogAuth, updateSingleBlog).delete(blogAuth, deleteBlog)

module.exports = router