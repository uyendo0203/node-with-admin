const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const Blog = require('./models/Blog');
const User = require('./models/User');
const connectDB = require('./config/db');

(async () => {
  await connectDB(); // Gọi hàm kết nối MongoDB
})();

const app = express();
const PORT = 3000; //xxx

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts); // Đảm bảo đã sử dụng express-ejs-layouts
app.set('layout', 'layouts/main'); // Default layout file (optional)

// ================================================== 

// Dữ liệu mẫu cho bài viết
// let blogs = [
//   { id: 1, title: 'Bài viết 1', content: 'Nội dung bài viết 1' },
//   { id: 2, title: 'Bài viết 2', content: 'Nội dung bài viết 2' },
// ];

// Dữ liệu mẫu cho người dùng
let users = [
  { id: 1, username: 'user1', email: 'user1@example.com' },
  { id: 2, username: 'user2', email: 'user2@example.com' },
];

// Khai báo thư mục views (nếu cần)
const path = require('path');
app.set('views', path.join(__dirname, 'views'));

// Home
app.get('/', (req, res) => {
  res.render('index', { title: 'Trang chính' });
});

// List blog
app.get('/blogs', async (req, res) => {
  const db = await connectDB();
  if (!db) {
    return res.status(500).send('Failed to connect to database');
  }
  const blogs = await db.collection('blogs').find().toArray();
  res.render('blog', { title: 'Bài viết', blogs });
});

// Add blog
app.get('/blogs/add', (req, res) => {
  res.render('blog-add', { title: 'Thêm bài viết' });
});

app.post('/blogs/add', async (req, res) => {
  try {
      console.log("📩 Dữ liệu nhận được:", req.body); // Log dữ liệu gửi lên

      const { title, content } = req.body;
      const newBlog = new Blog({ title, content });

      await newBlog.save(); // Lưu vào MongoDB

      console.log("✅ Bài viết đã được thêm:", newBlog);
      res.status(201).json({ message: "Thêm bài viết thành công", blog: newBlog });
  } catch (err) {
      console.error('❌ Lỗi khi lưu blog:', err);
      res.status(500).json({ error: err.message });
  }
});


// Edit blog
app.get('/blogs/edit/:id', async (req, res) => {
  const db = await connectDB();
  if (!db) {
    return res.status(500).send('Failed to connect to database');
  }
  const blog = await db.collection('blogs').findOne({ _id: req.params.id });
  if (blog) {
    res.render('blog-edit', { title: 'Sửa bài viết', blog });
  } else {
    res.redirect('/blogs');
  }
});

app.post('/blogs/edit/:id', async (req, res) => {
  const db = await connectDB();
  if (!db) {
    return res.status(500).send('Failed to connect to database');
  }
  await db.collection('blogs').updateOne({ _id: req.params.id }, { $set: { title: req.body.title, content: req.body.content } });
  res.redirect('/blogs');
});

// Delete blog
app.post('/blogs/delete/:id', async (req, res) => {
  const db = await connectDB();
  if (!db) {
    return res.status(500).send('Failed to connect to database');
  }
  await db.collection('blogs').deleteOne({ _id: req.params.id });
  res.redirect('/blogs');
});

// List users
app.get('/users', async (req, res) => {
  const db = await connectDB();
  if (!db) {
    return res.status(500).send('Failed to connect to database');
  }
  const users = await db.collection('users').find().toArray();
  res.render('users', { title: 'Người dùng', users });
  console.log({users});
});

// Add user
app.get('/users/add', (req, res) => {
  res.render('user-add', { title: 'Thêm người dùng' });
});

app.post('/users/add', async (req, res) => {
  try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json({ message: 'User created!', user: newUser });
      // Remove the redundant res.redirect('/users');
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

// Edit user 
app.get('/users/edit/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    res.render('user-edit', { title: 'Sửa người dùng', user });
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

// Delete user 
app.post('/users/delete/:id', (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.redirect('/users');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

