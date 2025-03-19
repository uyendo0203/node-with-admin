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


const loadSettingsMiddleware = async (req, res, next) => {
  try {
      const settings = await Settings.findOne({}); // Lấy cài đặt
      res.locals.settings = settings || {}; // Lưu cài đặt vào res.locals
      next(); // Tiếp tục với middleware tiếp theo hoặc route
  } catch (error) {
      console.error('Error fetching settings (loadSettingsMiddleware):', error);
      res.locals.settings = {}; // Khởi tạo thành đối tượng rỗng nếu không có
      next(); // Tiếp tục bất chấp lỗi
  }
};

app.use(loadSettingsMiddleware);

// Home
app.get('/', (req, res) => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
];
  res.render('index', { title: 'Home', currentPage: '', breadcrumbs });
});

// Routes
const apiBlogRoutes = require('./routes/BlogRoutes/apiBlog');
app.use('/', apiBlogRoutes); // Sử dụng blog routes api
const viewBlogRoutes = require('./routes/BlogRoutes/viewBlog');
app.use('/', viewBlogRoutes); // Sử dụng blog routes view

const apiSettingsRoutes = require('./routes/SettingsRoutes/apiSettings');
app.use('/', apiSettingsRoutes); // Sử dụng user api
const viewSettingsRoutes = require('./routes/SettingsRoutes/viewSettings');
app.use('/', viewSettingsRoutes); // Sử dụng user routes


const userRoutes = require('./routes/UserRoutes');
app.use('/', userRoutes); // Sử dụng user routes


// Chạy server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server chạy tại http://localhost:${PORT}`));


module.exports = app;