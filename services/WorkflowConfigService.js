const WorkflowConfigModel = require('../models/workflowConfigModel');
const User = require('../models/userModel');  

const Object=require('../models/objectModel');
// Obtenir toutes les configurations de workflow
async function getDataFromDBService() {
  try {
    const configs = await WorkflowConfigModel.find({});
    return configs;
  } catch (error) {
    throw new Error('Error fetching configs from database: ' + error.message);
  }
}


// Obtenir une configuration de workflow par ID
async function getWorkflowConfigByIdService(configId) {
  try {
    const config = await WorkflowConfigModel.findById(configId)
      .populate('objectId')
      .populate('approvers').populate('User');
    if (!config) {
      throw new Error('WorkflowConfig not found');
    }
    return config;
  } catch (error) {
    throw new Error('Error fetching workflow config from database: ' + error.message);
  }
}
;
const createWorkflowConfig = async (data) => {
  try {
    const { objectId, approvalType } = data;

    // Fetch the object to get its owner
    const object = await Object.findById(objectId).populate('DataOwner'); // Assuming 'DataOwner' is a field in Object

    if (!object) {
      throw new Error('Object not found');
    }

    // If the approvalType is 'Owner', set the approvers to the object's owner
    let approvers = [];
    if (approvalType === 'Owner') {
      approvers = [object.DataOwner._id];
    } else if (approvalType === 'Fixed') {
      approvers = data.approvers || [];
    } else if (approvalType !== 'Hierarchical') {
      throw new Error('Only Hierarchical approval type is allowed');
    }

    // Create the workflow configuration with the appropriate approvers
    const workflowConfig = new WorkflowConfigModel({
      objectId,
      approvalType,
      approvers // Approvers are initially empty for "Hierarchical"
    });

    await workflowConfig.save();
    return workflowConfig;
  } catch (error) {
    throw new Error(error.message);
  }
};
// Mettre à jour une configuration de workflow existante
async function updateWorkflowConfigService(configId, configDetails) {
  try {
    const updatedConfig = await WorkflowConfigModel.findByIdAndUpdate(
      configId,
      configDetails,
      { new: true, runValidators: true } // Retourne le document mis à jour et applique les validations
    ).populate('objectId')
     .populate('approvers').populate('User');
    if (!updatedConfig) {
      throw new Error('WorkflowConfig not found');
    }
    return updatedConfig;
  } catch (error) {
    throw new Error('Error updating workflow config in database: ' + error.message);
  }
}

// Supprimer une configuration de workflow
async function removeWorkflowConfigService(configId) {
  try {
    const deletedConfig = await WorkflowConfigModel.findByIdAndDelete(configId);
    if (!deletedConfig) {
      throw new Error('WorkflowConfig not found');
    }
    return deletedConfig;
  } catch (error) {
    throw new Error('Error removing workflow config from database: ' + error.message);
  }
}

// Obtenir une configuration de workflow par l'ID de l'objet


module.exports = {
  getDataFromDBService,
  getWorkflowConfigByIdService,
  createWorkflowConfig,
  updateWorkflowConfigService,
  removeWorkflowConfigService
};
