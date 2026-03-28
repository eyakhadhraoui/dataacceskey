const DataApprovalRequest = require('../models/dataApprovalRequestModel');
const WorkflowConfig = require('../models/workflowConfigModel');
const ObjectModel = require('../models/objectModel');
const dataApprovalRequestService = require('../services/DataApprovalRequestService');
const UserRequestVali =require('../models/UserRequestVali')
const User = require('../models/userModel');

const mongoose = require('mongoose');

// Get all DataApprovalRequests
async function getAllDataApprovalRequests(req, res) {
  try {
    const requests = await dataApprovalRequestService.getAllDataApprovalRequestsService();
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching all data approval requests:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get a specific DataApprovalRequest by ID
async function getDataApprovalRequestById(req, res) {
  const { requestId } = req.params;
  try {
    if (!requestId) {
      return res.status(400).json({ error: 'Request ID is required' });
    }
    const request = await dataApprovalRequestService.getDataApprovalRequestByIdService(requestId);
    res.status(200).json(request);
  } catch (error) {
    console.error('Error fetching data approval request by ID:', error);
    res.status(500).json({ error: error.message });
  }
}


const createDataApprovalRequest = async (req, res) => {
  try {
    const { workflowConfigId, userId } = req.body;

    if (!workflowConfigId) {
      return res.status(400).json({ error: 'WorkflowConfigId is required' });
    }

    if (!userId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    // Fetch the workflow configuration to determine the approval type
    const workflowConfig = await WorkflowConfig.findById(workflowConfigId);
    if (!workflowConfig) {
      return res.status(400).json({ error: 'Workflow configuration not found' });
    }

    const { approvalType, objectId,  approvers: workflowApprovers  } = workflowConfig;
    let approvers = [];

    // Handle hierarchical approval
    if (approvalType === 'Hierarchical') {
      const user = await User.findById(userId).populate('nPlus1 nPlus2');
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }

      if (user.nPlus1) approvers.push(user.nPlus1._id);
      if (user.nPlus2) approvers.push(user.nPlus2._id);

      if (approvers.length === 0) {
        return res.status(400).json({ error: 'No approvers found for hierarchical approval' });
      }
    } 
    // Handle owner approval
    else if (approvalType === 'Owner') {
      const object = await ObjectModel.findById(objectId);
      if (!object) {
        return res.status(400).json({ error: 'Object not found' });
      }

      // Determine the correct DataOwner based on ownerModel
      let dataOwnerId;
      if (object.DataOwner.ownerModel === 'User') {
        dataOwnerId = object.DataOwner.ownerId;
      } else if (object.DataOwner.ownerModel === 'Departement') {
        // For Departement, ensure you have the correct model and fetch it
        // const Departement = require('../models/departementModel');
        // const departement = await Departement.findById(object.DataOwner.ownerId);
        // dataOwnerId = departement._id;
        return res.status(400).json({ error: 'Departement owner model not yet supported' });
      } else {
        return res.status(400).json({ error: 'Invalid owner model' });
      }

      if (dataOwnerId) approvers.push(dataOwnerId);
      if (approvers.length === 0) {
        return res.status(400).json({ error: 'No approvers found for owner approval' });
      }
    } 
    // Handle fixed approval
    else if (approvalType === 'Fixed') {
      // Validate and include fixed approvers from workflow configuration
      if (workflowApprovers && workflowApprovers.length > 0) {
        approvers = workflowApprovers
          .filter(id => mongoose.Types.ObjectId.isValid(id)); // Validate IDs

        if (approvers.length === 0) {
          return res.status(400).json({ error: 'No valid fixed approvers found in workflow configuration' });
        }
      } else {
        return res.status(400).json({ error: 'No fixed approvers found in workflow configuration' });
      }
    } else {
      return res.status(400).json({ error: 'Invalid approval type' });
    }

    // Final validation: Check if approvers array is populated and valid
    if (approvers.length === 0) {
      return res.status(400).json({ error: 'Approvers array is empty' });
    }

    // Create the DataApprovalRequest
    const dataApprovalRequest = new DataApprovalRequest({
      userId,
      workflowConfigId,
      approvers,
      status: 'Pending',
    });
   
    const savedRequest = await dataApprovalRequest.save();

    // Create the corresponding UserRequestVali
    const userRequestVali = new UserRequestVali({
      iddata: savedRequest._id, // Correctly linking the dataApprovalRequest ID
      idworkflow: workflowConfigId,
      idrequest: savedRequest._id,
      status: 'Pending',
      requestdate: new Date(), // Assuming the request date is current date
      approvaldate: null,
      approvaltexte: ''
    });

    await userRequestVali.save();

    return res.status(201).json({ dataApprovalRequest: savedRequest, userRequestVali });

  } catch (error) {
    console.error('Error creating data approval request:', error.message);
    return res.status(500).json({ error: error.message });
  }
};






async function removeDataApprovalRequest(req, res) {
  const { requestId } = req.params;
  try {
    if (!requestId) {
      return res.status(400).json({ error: 'Request ID is required' });
    }
    const deletedRequest = await dataApprovalRequestService.removeDataApprovalRequestService(requestId);
    res.status(200).json(deletedRequest);
  } catch (error) {
    console.error('Error removing data approval request:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllDataApprovalRequests,
  getDataApprovalRequestById,
  createDataApprovalRequest,

  removeDataApprovalRequest
};
