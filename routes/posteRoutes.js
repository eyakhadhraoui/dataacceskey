const express = require('express');
const posteController = require('../controls/posteController'); // Corrected path

const router = express.Router();

// Define routes for handling postes
router.get('/poste/getAll', posteController.getAllposte);
router.get('/poste/:id', posteController.getposteById);
router.post('/poste/create', posteController.createposte);
router.put('/poste/update/:id', posteController.updateposte);
router.delete('/poste/remove/:id', posteController.removeposte);

module.exports = router;
