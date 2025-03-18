const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Danh sách User
router.get('/', async (req, res) => {
    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Users', url: '/users' }
    ];
    const users = await User.find().sort({ createdAt: -1 });
    res.render('users', { title: 'Danh sách user', currentPage: 'users', users, breadcrumbs });
});

// Form thêm User
router.get('/add', (req, res) => {
    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Users', url: '/users' },
        { name: 'Thêm user', url: '/users/add' }
    ];
    res.render('user-add', { title: 'Thêm user', currentPage: 'users', breadcrumbs });
});

// Xử lý thêm User
router.post('/add', async (req, res) => {
    const newUser = { username: req.body.username, email: req.body.email }; // Đảm bảo bạn có các trường đúng từ req.body
    await User.create(newUser);
    res.redirect('/users');
});

// Form sửa User
router.get('/edit/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    const breadcrumbs = [
        { name: 'Home', url: '/' },
        { name: 'Users', url: '/users' },
        { name: 'Chỉnh sửa user', url: `/users/edit/${user._id}` }
    ];
    res.render('user-edit', { title: 'Chỉnh sửa user', currentPage: 'users', user, breadcrumbs });
});

// Xử lý sửa User
router.post('/edit/:id', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { 
        username: req.body.username, 
        email: req.body.email 
    });
    res.redirect('/users');
});

// Xóa User
router.delete('/delete/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
});

module.exports = router;