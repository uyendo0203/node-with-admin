const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const path = require('path'); // Moved here
const app = express();
require('dotenv').config();

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  connectTimeoutMS: 30000, // Increase connection timeout to 30 seconds
  socketTimeoutMS: 30000,   // Increase socket timeout to 30 seconds
  // useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Kết nối MongoDB thành công"))
.catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));


// Middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Default layout file (optional)
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// Khai báo thư mục views (nếu cần)
app.set('views', path.join(__dirname, 'views'));


// Home
app.get('/', (req, res) => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
];
  res.render('index', { title: 'Trang chính', currentPage: '', breadcrumbs });
});

// Routes
const blogRoutes = require('./routes/BlogRoutes');
app.use('/', blogRoutes); // Sử dụng blog routes

const userRoutes = require('./routes/UserRoutes');
app.use('/users', userRoutes); // Sử dụng user routes

const settingsRoutes = require('./routes/SettingsRoute');
const Blog = require('./models/Blog');
app.use('/settings', settingsRoutes); // Sử dụng user routes


// Chạy server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));


module.exports = app;