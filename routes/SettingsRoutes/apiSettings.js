const express = require('express');
const Settings = require('../../models/Settings');
const router = express.Router();

// Add middleware to parse JSON and URL-encoded data
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Render settings page
router.get('/api/settings', async (req, res) => {
    try {
        const settings = await Settings.findOne({});
        res.status(200).json(settings);
    } catch (err) {
        console.error('Error fetching settings from the database (api/settings):', err);
        res.status(500).send('Error fetching settings from the database (api/settings)');
    }
});


module.exports = router;