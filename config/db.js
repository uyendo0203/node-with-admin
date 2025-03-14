const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("✅ Kết nối MongoDB thành công"))
      .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));
}

module.exports = connectDB; 