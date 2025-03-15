"use strict";

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');
var connectDB = require('./config/db');
var app = express();
require('dotenv').config();

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("✅ Kết nối MongoDB thành công");
})["catch"](function (err) {
  return console.error("❌ Lỗi kết nối MongoDB:", err);
});

// Middleware
app.use(express["static"]('public'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Default layout file (optional)
app.set('view engine', 'ejs');

// ================================================== 

// Dữ liệu mẫu cho người dùng
var users = [{
  id: 1,
  username: 'user1',
  email: 'user1@example.com'
}, {
  id: 2,
  username: 'user2',
  email: 'user2@example.com'
}];

// Khai báo thư mục views (nếu cần)
var path = require('path');
app.set('views', path.join(__dirname, 'views'));

// Home
app.get('/', function (req, res) {
  res.render('index', {
    title: 'Trang chính'
  });
});
var blogRoutes = require('./routes/BlogRoutes');
app.use('/blogs', blogRoutes);
var userRoutes = require('./routes/UserRoutes');
app.use('/users', userRoutes);

// Chạy server
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  return console.log("\uD83D\uDE80 Server ch\u1EA1y t\u1EA1i http://localhost:".concat(PORT));
});
