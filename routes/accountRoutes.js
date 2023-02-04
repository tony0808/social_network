const express = require('express');
const router = express.Router();
const accountController = require('../controller/accountController');

router.get('/create', accountController.account_create_get);
router.get('/login', accountController.account_login_get);
router.get('/delete', accountController.account_delete_confirm);
router.post('/create', accountController.account_create_post)
router.post('/login', accountController.account_login_post);
router.delete('/delete', accountController.account_delete);

module.exports = router;