const express = require('express');
const router = express.Router();
const userRequestValiController = require('../controls/userRequestValiController');

// Route to approve a UserRequestVali
router.post('/:valiId/approve', userRequestValiController.approveUserRequestVali);

module.exports = router;