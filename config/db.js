const { MongoClient } = require('mongodb');

const uri = "mongodb://127.0.0.1:27017"; // Đổi thành URI MongoDB của bạn
const client = new MongoClient(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true ,
    serverSelectionTimeoutMS: 20000
});

async function connectDB() {
    try {
        await client.connect();
        console.log("✅ Đã kết nối MongoDB thành công!");
        return client.db("mydatabase"); // Đổi "mydatabase" thành tên database của bạn
    } catch (error) {
        console.error("❌ Lỗi kết nối MongoDB:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;