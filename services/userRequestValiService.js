const DataApprovalRequest = require('../models/dataApprovalRequestModel');
const UserRequestVali = require('../models/UserRequestVali');
const User=require('../models/userModel')

const mongoose = require('mongoose');

const approveUserRequestVali = async (valiId, approverId, approvalDetails) => {
  // Validate ObjectId formats
  if (!mongoose.Types.ObjectId.isValid(valiId) || !mongoose.Types.ObjectId.isValid(approverId)) {
    throw new Error('Invalid ID format');
  }

  // Find the UserRequestVali
  const userRequestVali = await UserRequestVali.findById(valiId);
  if (!userRequestVali) {
    throw new Error('UserRequestVali not found');
  }

  // Use the correct field for linking to DataApprovalRequest
  const dataApprovalRequestId = userRequestVali.iddata;  // Ensure this field holds the correct DataApprovalRequest ID

  // Fetch the DataApprovalRequest using the correct ID
  const dataApprovalRequest = await DataApprovalRequest.findById(dataApprovalRequestId);
  if (!dataApprovalRequest) {
    throw new Error('DataApprovalRequest not found');
  }

  // Check if the approver is authorized to approve this request
  if (!dataApprovalRequest.approvers.includes(approverId)) {
    throw new Error('Approver is not authorized to approve this request');
  }

  // Update DataApprovalRequest status
  dataApprovalRequest.status = 'Approved';
  await dataApprovalRequest.save();

  // Update UserRequestVali status
  userRequestVali.status = 'Approved';
  userRequestVali.approvaldate = new Date();
  userRequestVali.approvaltexte = approvalDetails.approvaltexte || '';

  await userRequestVali.save();

  return { dataApprovalRequest, userRequestVali };
};


module.exports = {
  approveUserRequestVali
};
