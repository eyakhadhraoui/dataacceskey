// models/DataApprovalRequestModel.js
const mongoose = require('mongoose');

const DataApprovalRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    workflowConfigId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkflowConfig', required: true },
    approvers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }], // Array of ObjectIds
    requestDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  });

const DataApprovalRequestModel = mongoose.model('DataApprovalRequest', DataApprovalRequestSchema);
module.exports = DataApprovalRequestModel;
