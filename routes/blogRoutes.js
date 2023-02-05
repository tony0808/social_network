const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController');

// main page
router.get('/home', blogController.blog_home_page_get);
router.get('/settings', blogController.blog_setting_page_get);
router.get('/logout', blogController.blog_logout_get);
router.get('/blogs', blogController.blog_blogs_page_get);
router.get('/friends', blogController.blog_friends_page_get);
// list blogs
router.get('/list', blogController.all_blog_list_page_get);
router.get('/list/:id', blogController.single_blog_list_page_get);
router.delete('/list/:blog_id', blogController.single_blog_delete);
// create new blogs
router.get('/create', blogController.blog_create_page_get);
router.post('/create', blogController.blog_create_page_post);
//update blogs
router.get('/edit/:blog_id', blogController.blog_edit_page_get);
router.post('/edit/:blog_id', blogController.blog_edit_page_post);
// profile
router.get('/profile', blogController.blog_profile_get);
router.post('/profile', blogController.blog_profile_post);

module.exports = router;