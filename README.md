# Node with Admin

## Mô tả
**Node with Admin** là một ứng dụng web được xây dựng bằng Node.js và Express.js, sử dụng MongoDB làm cơ sở dữ liệu. Ứng dụng cung cấp các chức năng quản lý blog, bao gồm:
- Thêm bài viết mới.
- Chỉnh sửa bài viết.
- Xóa bài viết.
- Hiển thị danh sách bài viết.

Ứng dụng sử dụng giao diện được render bằng EJS và hỗ trợ các phương thức HTTP như GET, POST, DELETE thông qua middleware `method-override`.

## Công nghệ sử dụng
- **Node.js**: Nền tảng chính để xây dựng ứng dụng.
- **Express.js**: Framework để quản lý routing và middleware.
- **MongoDB**: Cơ sở dữ liệu NoSQL để lưu trữ thông tin bài viết.
- **Mongoose**: ODM để tương tác với MongoDB.
- **EJS**: Công cụ render giao diện.
- **dotenv**: Quản lý biến môi trường.
- **method-override**: Hỗ trợ các phương thức HTTP như PUT và DELETE.

## Cách chạy dự án
1. Clone dự án:
   ```bash
   git clone https://github.com/uyendo0203/node-with-admin
   cd node-with-admin
   ```

2. Cài đặt các package:
   ```bash
   npm install
   ```

3. Tạo file `.env` và cấu hình biến môi trường:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
   PORT=3001
   ```

4. Chạy ứng dụng:
   ```bash
   npm start  ---> start dự án
   ```
   ```bash
   npm run build-css  ---> run build css realtime
   ```


5. Truy cập ứng dụng tại:
   ```
   http://localhost:3001
   ```

## Chức năng chính
- **Trang chủ**: Hiển thị danh sách bài viết.
- **Thêm bài viết**: Form để thêm bài viết mới.
- **Chỉnh sửa bài viết**: Form để chỉnh sửa nội dung bài viết.
- **Xóa bài viết**: Xóa bài viết khỏi cơ sở dữ liệu.

## Cấu trúc thư mục
```
node-with-admin/
├── app.js               # File chính của ứng dụng
├── config/
│   └── db.js            # Kết nối MongoDB
├── models/
│   └── Blog.js          # Mô hình dữ liệu cho bài viết
├── routes/
│   ├── BlogRoutes.js    # Định nghĩa các route cho blog
│   └── UserRoutes.js    # Định nghĩa các route cho user
├── views/
│   ├── blogs/           # Các view liên quan đến blog
│   ├── layouts/         # Layout chính
│   └── index.ejs        # Trang chủ
├── public/              # Thư mục chứa file tĩnh (CSS, JS, hình ảnh)
└── .env                 # File cấu hình biến môi trường
```

## Ghi chú
- Đảm bảo MongoDB đã được cấu hình đúng và có thể truy cập từ ứng dụng.
- Nếu deploy lên Vercel hoặc các nền tảng khác, cần cấu hình biến môi trường trong dashboard của nền tảng đó.

## Tác giả
- **Zen**: Người phát triển chính của dự án.
```