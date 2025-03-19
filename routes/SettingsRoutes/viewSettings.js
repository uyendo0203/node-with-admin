const express = require('express');
const path = require('path');
const multer = require('multer');
const Settings = require('../../models/Settings');
const router = express.Router();

// Add middleware to parse JSON and URL-encoded data
router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads/')); // Đường dẫn đến thư mục uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({
    storage: storage
});

// Render settings page
router.get('/settings', async (req, res) => {
    const breadcrumbs = [{
            name: 'Home',
            url: '/'
        },
        {
            name: 'Settings',
            url: '/settings'
        }
    ];

    try {
        const settings = await Settings.findOne({});
        res.locals.settings = settings; // Khởi tạo làm đối tượng rỗng nếu không có
        res.render('settings', {
            title: 'Settings',
            currentPage: 'settings',
            breadcrumbs,
            settings,
            success: req.query.success
        });
    } catch (err) {
        console.error('Error fetching settings from the database (/settings):', err);
        res.status(500).send('Error fetching settings from the database (/settings)');
    }
});

// Handle form submission
router.post('/settings/save-settings', upload.fields([{
    name: 'favicon'
}, {
    name: 'logo'
}]), async (req, res) => {
    try {
        const existingSettings = await Settings.findOne({}); // Lấy cài đặt hiện tại

        if (!existingSettings) {
            return res.status(404).send('Settings not found.');
        }

        const faviconPath = req.files['favicon'] && req.files['favicon'].length > 0 ? req.files['favicon'][0].filename : existingSettings.favicon;
        const logoPath = req.files['logo'] && req.files['logo'].length > 0 ? req.files['logo'][0].filename : existingSettings.logo;
        const address = req.body.address;
        const phone = req.body.phone;
        const site_title = req.body.site_title;
        const site_des = req.body.site_des;
        const copyright = req.body.copyright;

        // Cập nhật cài đặt
        existingSettings.favicon = faviconPath;
        existingSettings.logo = logoPath;
        existingSettings.address = address;
        existingSettings.phone = phone;
        existingSettings.site_title = site_title;
        existingSettings.site_des = site_des;
        existingSettings.copyright = copyright;

        await existingSettings.save(); // Lưu thay đổi
        console.log('Settings updated successfully in MongoDB');
        res.redirect('/settings?success=true');
    } catch (err) {
        console.error('Error saving settings to the database:', err);
        return res.status(500).send('Error saving settings to the database: ' + err.message);
    }
});

module.exports = router;