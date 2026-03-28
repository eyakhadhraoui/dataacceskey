// routes/routes.js
const express = require('express');
const router = express.Router();
const objectController = require('../controls/objectControl.js'); // Adjust path if necessary

// Define routes
router.get('/objects/getAll', objectController.getAllObjects);
router.get('/objects/:objectId', objectController.getObjectById);
router.post('/objects/create', objectController.createObject);
router.put('/objects/update/:objectId', objectController.updateObject);
router.delete('/objects/remove/:objectId', objectController.removeObject);

module.exports = router;

