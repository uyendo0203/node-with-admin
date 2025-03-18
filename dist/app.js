"use strict";

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');
var path = require('path'); // Moved here
var app = express();
require('dotenv').config();

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI, {
  connectTimeoutMS: 30000,
  // Increase connection timeout to 30 seconds
  socketTimeoutMS: 30000,
  // Increase socket timeout to 30 seconds
  // useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log("✅ Kết nối MongoDB thành công");
})["catch"](function (err) {
  return console.error("❌ Lỗi kết nối MongoDB:", err);
});

// Middleware
app.use(express["static"](path.join(__dirname, 'public'))); // Serve static files from 'public'
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride('_method'));
app.use(expressLayouts);
app.set('layout', 'layouts/main'); // Default layout file (optional)
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));

// Khai báo thư mục views (nếu cần)
app.set('views', path.join(__dirname, 'views'));

// Home
app.get('/', function (req, res) {
  var breadcrumbs = [{
    name: 'Home',
    url: '/'
  }];
  res.render('index', {
    title: 'Trang chính',
    currentPage: '',
    breadcrumbs: breadcrumbs
  });
});

// Routes
var blogRoutes = require('./routes/BlogRoutes');
app.use('/blogs', blogRoutes); // Sử dụng blog routes

var userRoutes = require('./routes/UserRoutes');
app.use('/users', userRoutes); // Sử dụng user routes

var settingsRoutes = require('./routes/SettingsRoute');
app.use('/settings', settingsRoutes); // Sử dụng user routes

// Chạy server
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  return console.log("\uD83D\uDE80 Server ch\u1EA1y t\u1EA1i http://localhost:".concat(PORT));
});
module.exports = app;
