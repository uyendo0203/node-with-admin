const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
    favicon: { type: String, required: true },
    logo: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true }, // Có thể dùng String nếu số điện thoại có ký tự không phải số
    copyright: { type: String, default: '' }, // Không bắt buộc
    title: { type: String, default: '' }, // Không bắt buộc
    description: { type: String, default: '' }, // Không bắt buộc
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;