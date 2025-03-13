const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts); // Đảm bảo đã sử dụng express-ejs-layouts
app.set('layout', 'layouts/main'); // Default layout file (optional)

console.log(app.locals);


// Dữ liệu mẫu cho bài viết
let blogs = [
  { id: 1, title: 'Bài viết 1', content: 'Nội dung bài viết 1' },
  { id: 2, title: 'Bài viết 2', content: 'Nội dung bài viết 2' },
];

// Dữ liệu mẫu cho người dùng
let users = [
  { id: 1, username: 'user1', email: 'user1@example.com' },
  { id: 2, username: 'user2', email: 'user2@example.com' },
];

// Khai báo thư mục views (nếu cần)
const path = require('path');
app.set('views', path.join(__dirname, 'views'));

// Route cho trang chính
app.get('/', (req, res) => {
  res.render('index', { title: 'Trang chính' });
});

// Route cho danh sách blog
app.get('/blogs', (req, res) => {
  res.render('blog', { title: 'Danh sách bài viết', blogs });
});

// Route để thêm blog
app.get('/blogs/add', (req, res) => {
  res.render('add-blog', { title: 'Thêm bài viết' });
});

app.post('/blogs/add', (req, res) => {
  const newBlog = {
    id: blogs.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  blogs.push(newBlog);
  res.redirect('/blogs');
});

// Route để sửa blog
app.get('/blogs/edit/:id', (req, res) => {
  const blog = blogs.find(b => b.id == req.params.id);
  if (blog) {
    res.render('edit-blog', { title: 'Sửa bài viết', blog });
  } else {
    res.redirect('/blogs');
  }
});

app.post('/blogs/edit/:id', (req, res) => {
  const blog = blogs.find(b => b.id == req.params.id);
  if (blog) {
    blog.title = req.body.title;
    blog.content = req.body.content;
  }
  res.redirect('/blogs');
});

// Route để xóa blog
app.post('/blogs/delete/:id', (req, res) => {
  blogs = blogs.filter(b => b.id != req.params.id);
  res.redirect('/blogs');
});

// Route cho danh sách người dùng
app.get('/users', (req, res) => {
  res.render('users', { title: 'Danh sách người dùng', users });
});

// Route để thêm người dùng
app.get('/users/add', (req, res) => {
  res.render('add-user', { title: 'Thêm người dùng' });
});

app.post('/users/add', (req, res) => {
  const newUser = {
    id: users.length + 1,
    username: req.body.username,
    email: req.body.email,
  };
  users.push(newUser);
  res.redirect('/users');
});

// Route để sửa người dùng
app.get('/users/edit/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    res.render('edit-user', { title: 'Sửa người dùng', user });
  } else {
    res.redirect('/users');
  }
});

app.post('/users/edit/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    user.username = req.body.username;
    user.email = req.body.email;
  }
  res.redirect('/users');
});

// Route để xóa người dùng
app.post('/users/delete/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.redirect('/users');
});

// Bắt đầu server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});