const express = require('express');
const userController = require('../controls/userControl.js'); // Ensure this path is correct

const router = express.Router();

// Define routes
router.get('/user/getAll', userController.getAllUsers);
router.get('/user/:userId', userController.getUserById);
router.post('/user/create', userController.createUser);
router.put('/user/update/:userId', userController.updateUser);
router.delete('/user/remove/:userId', userController.removeUser);

module.exports = router;
