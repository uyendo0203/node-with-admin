const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Danh sách User
router.get('/', async (req, res) => {
    const users = await User.find().sort({ createdAt: -1 });
    res.render('users', { title: 'Danh sách user', users });
});

// Form thêm User
router.get('/add', (req, res) => {
    res.render('user-add', { title: 'Thêm user' });
});

// Xử lý thêm User
router.post('/add', async (req, res) => {
    await User.create({ message: 'User created!', user: newUser});
    res.redirect('/users');
});

// Form sửa User
router.get('/edit/:id', async (req, res) => {
    const blog = await User.findById(req.params.id);
    res.render('user-edit', { title: 'Chỉnh sửa user', blog });
});

// Xử lý sửa User
router.post('/edit/:id', async (req, res) => {
    // await User.findByIdAndUpdate(req.params.id, { title: req.body.title, content: req.body.content });
    
    const user = User.find(u => u.id == req.params.id);
    if (user) {
        user.username = req.body.username;
        user.email = req.body.email;
    }
    res.redirect('/users');
});

// Xóa User
router.delete('/delete/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
});

module.exports = router;
