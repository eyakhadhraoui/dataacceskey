const DataApprovalRequest = require('../models/dataApprovalRequestModel');
const WorkflowConfig = require('../models/workflowConfigModel');
const ObjectModel = require('../models/objectModel');
const User = require('../models/userModel');

// Get all DataApprovalRequests
async function getAllDataApprovalRequestsService() {
  try {
    const requests = await DataApprovalRequest.find({})
      .populate('workflowConfigId').populate('User');
    return requests;
  } catch (error) {
    throw new Error('Error fetching data approval requests from database: ' + error.message);
  }
}

// Get a specific DataApprovalRequest by ID
async function getDataApprovalRequestByIdService(requestId) {
  try {
    const request = await DataApprovalRequest.findById(requestId)
      
      .populate('workflowConfigId').populate('User');
    if (!request) {
      throw new Error('DataApprovalRequest not found');
    }
    return request;
  } catch (error) {
    throw new Error('Error fetching data approval request from database: ' + error.message);
  }
}



const createDataApprovalRequest = async (req, res) => {
  try {
    const { workflowConfigId, userId } = req.body; // Assuming userId is provided in the request body

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

      // Get N+1 and N+2 approvers
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
    await dataApprovalRequest.save();
    return res.status(201).json(dataApprovalRequest);

  } catch (error) {
    console.error('Error creating data approval request:', error.message);
    return res.status(500).json({ error: error.message });
  }
};


async function removeDataApprovalRequestService(requestId) {
  try {
    const deletedRequest = await DataApprovalRequest.findByIdAndDelete(requestId);
    if (!deletedRequest) {
      throw new Error('DataApprovalRequest not found');
    }
    return deletedRequest;
  } catch (error) {
    throw new Error('Error removing data approval request from database: ' + error.message);
  }
}

module.exports = {
  getAllDataApprovalRequestsService,
  getDataApprovalRequestByIdService,
  createDataApprovalRequest,

  removeDataApprovalRequestService
};
