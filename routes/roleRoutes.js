const express = require('express');
const roleController = require('../controls/rolecontrol'); // Corrected path

const router = express.Router();

// Define routes for handling postes
router.get('/role/getAll', roleController.getAllroles);
router.get('/role/:id', roleController.getroleById);
router.post('/role/create', roleController.createrole);
router.put('/role/update/:id', roleController.updaterole);
router.delete('/role/remove/:id', roleController.removerole);

module.exports = router;