const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// Danh sách bài viết
router.get('/', async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('blogs', { title: 'Danh sách blog', blogs });
});

// Form thêm blog
router.get('/add', (req, res) => {
    res.render('blog-add', { title: 'Thêm bài viết' });
});

// Xử lý thêm blog
router.post('/add', async (req, res) => {
    await Blog.create({ title: req.body.title, content: req.body.content });
    res.redirect('/blogs');
});

// Form sửa blog
router.get('/edit/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('blog-edit', { title: 'Chỉnh sửa blog', blog });
});

// Xử lý sửa blog
router.post('/edit/:id', async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, { title: req.body.title, content: req.body.content });
    res.redirect('/blogs');
});

// Xóa blog
router.delete('/delete/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/blogs');
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.status(500).send('Error deleting blog');
    }
});

module.exports = router;
