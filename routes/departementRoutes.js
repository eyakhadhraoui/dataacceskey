const express = require('express');
const departementController = require('../controls/departementController');

const router = express.Router();

router.get('/departement/getAll', departementController.getAlldepartement);
router.get('/departement/:id', departementController.getdepartementById);
router.post('/departement/create', departementController.createdepartement);
router.put('/departement/update/:id', departementController.updatedepartement);
router.delete('/departement/remove/:id', departementController.removedepartement);

module.exports = router;
