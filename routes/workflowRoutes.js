// routes/workflowRoutes.js
const express = require('express');
const router = express.Router();
const workflowControl = require('../controls/WorkflowConfigController');
// Routes pour la configuration du workflow
router.post('/workflow', workflowControl.createWorkflowConfig);
router.get('/workflow/getAll', workflowControl.getAllWorkflowConfigs);
router.get('/workflow/:configId', workflowControl.getWorkflowConfigById);
router.put('/workflow/update/:configId', workflowControl.updateWorkflowConfig);
router.delete('/workflow/remove/:configId', workflowControl.removeWorkflowConfig);

module.exports = router;
