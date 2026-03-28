// routes/dataApprovalRoutes.js
const express = require('express');
const router = express.Router();
const dataApprovalControl = require('../controls/DataApprovalRequestController');

// Routes pour les demandes d'approbation

router.get('/data-approval/getAll', dataApprovalControl.getAllDataApprovalRequests);
router.get('/data-approval/:dataApprovalRequestId', dataApprovalControl.getDataApprovalRequestById);
router.post('/data-approval-request', dataApprovalControl.createDataApprovalRequest);

router.delete('/data-approval/remove/:dataApprovalRequestId', dataApprovalControl.removeDataApprovalRequest);

module.exports = router;
