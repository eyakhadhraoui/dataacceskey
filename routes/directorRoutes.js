const express = require('express');
const router = express.Router();
const directorController = require('../controls/directorController');

// Routes for handling directors

router.get('/Director/getAll', directorController.getAlldirector);
router.get('/Director/:id', directorController.getdirectorById);
router.post('/Director/create', directorController.createdirector);
router.put('/Director/update/:id',  directorController.updatedirector);
router.delete('/Director/remove/:id', directorController.removedirector)
module.exports = router;
