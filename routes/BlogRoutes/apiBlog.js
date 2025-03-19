
const express = require('express');
const Blog = require('../../models/Blog');
const router = express.Router();


// JSON list of blogs
router.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs); // Trả về dữ liệu JSON
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).send('Error fetching blogs');
    }
});

//JSON detail of blog
router.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        res.json(blog); // Trả về dữ liệu JSON
    } catch (err) {
        console.error('Error fetching blog:', err);
        res.status(500).send('Error fetching blog');
    }
});

module.exports = router;