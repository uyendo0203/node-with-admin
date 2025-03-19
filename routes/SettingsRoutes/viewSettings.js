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
        cb(null, path.join(__dirname, '../../public/uploads/')); // Đường dẫn đến thư mục uploads
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
router.post('/settings/save-settings', upload.fields([
    { name: 'favicon' },
    { name: 'logo' }
]), async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded Files:", req.files);

        const existingSettings = await Settings.findOne({});

        if (!existingSettings) {
            return res.status(404).json({ error: 'Settings not found.' });
        }

        const faviconPath = req.files['favicon']?.[0]?.filename || existingSettings.favicon;
        const logoPath = req.files['logo']?.[0]?.filename || existingSettings.logo;

        existingSettings.favicon = faviconPath;
        existingSettings.logo = logoPath;
        existingSettings.address = req.body.address;
        existingSettings.phone = req.body.phone;
        existingSettings.site_name = req.body.site_name;
        existingSettings.site_des = req.body.site_des;
        existingSettings.copyright = req.body.copyright;

        console.log("Updated Settings:", existingSettings);
        await existingSettings.save();

        await existingSettings.save();
        console.log("Settings updated successfully");
        res.redirect('/settings')
    } catch (err) {
        console.error("Error saving settings to the database:", err);
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
});


module.exports = router;