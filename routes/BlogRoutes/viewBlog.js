const express = require('express');
const Blog = require('../../models/Blog');
const router = express.Router();

// HTML
router.get('/blogs', async (req, res) => {
    try {
        const breadcrumbs = [
            { name: 'Home', url: '/' },
            { name: 'Blogs', url: '/blogs' }
        ];
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.render('blogs', { title: 'Danh sách blog', currentPage: 'blogs', blogs, breadcrumbs});
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).send('Error fetching blogs');
    }
});

// Form thêm blog
// HTML
router.get('/blogs/add', (req, res) => {
    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Blogs', url: '/blogs' },
        { name: 'Thêm bài viết', url: '/blogs/add' }
    ];
    res.render('blog-add', { title: 'Thêm bài viết', currentPage: 'blogs', breadcrumbs });
});

router.post('/api/blogs/add', async (req, res) => {
    await Blog.create({ title: req.body.title, content: req.body.content });
    res.redirect('/blogs');
});

// Form sửa blog
router.get('/blogs/edit/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Blogs', url: '/blogs' },
        { name: 'Chỉnh sửa bài viết', url: `/blogs/edit/${blog._id}` }
    ];
    res.render('blog-edit', { title: 'Chỉnh sửa blog', currentPage: 'blogs', blog, breadcrumbs });
});

// Xử lý sửa blog
router.post('/blogs/edit/:id', async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, { title: req.body.title, content: req.body.content });
    res.redirect('/blogs');
});

// Xóa blog
router.delete('/blogs/delete/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/blogs');
    } catch (err) {
        console.error('Error deleting blog:', err);
        res.status(500).send('Error deleting blog');
    }
});

module.exports = router;