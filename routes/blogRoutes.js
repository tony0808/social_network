const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');

router.get('/home', blogController.blog_home_page_get);
router.get('/settings', blogController.blog_setting_page_get);
router.get('/logout', blogController.blog_logout_get);

module.exports = router;