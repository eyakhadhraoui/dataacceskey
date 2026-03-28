const workflowConfigService = require('../services/WorkflowConfigService');

// Obtenir toutes les configurations de workflow


async function getAllWorkflowConfigs(req, res) {
  try {
    const configs = await workflowConfigService.getDataFromDBService();
    res.status(200).json(configs);
  } catch (error) {
    console.error('Error fetching all workflow configs:', error);
    res.status(500).json({ error: error.message });
  }
}

// Obtenir une configuration de workflow spécifique par ID
async function getWorkflowConfigById(req, res) {
  const { configId } = req.params;
  try {
    if (!configId) {
      return res.status(400).json({ error: 'Config ID is required' });
    }
    const config = await workflowConfigService.getWorkflowConfigByIdService(configId);
    res.status(200).json(config);
  } catch (error) {
    console.error('Error fetching workflow config by ID:', error);
    res.status(500).json({ error: error.message });
  }
}
const createWorkflowConfig = async (req, res) => {
  try {
    const workflowConfigData = req.body;

    // Call the service without userId if it's not needed
    const workflowConfig = await workflowConfigService.createWorkflowConfig(workflowConfigData);

    res.status(201).json(workflowConfig);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createWorkflowConfig,
};


// Mettre à jour une configuration de workflow existante
async function updateWorkflowConfig(req, res) {
  const { configId } = req.params;
  const configDetails = req.body;
  
  try {
    if (!configId) {
      return res.status(400).json({ error: 'Config ID is required' });
    }
    
    const updatedConfig = await workflowConfigService.updateWorkflowConfigService(configId, configDetails);
    if (!updatedConfig) {
      return res.status(404).json({ message: 'Config not found' });
    }
    res.status(200).json(updatedConfig);
  } catch (error) {
    console.error('Error updating workflow config:', error);
    res.status(500).json({ error: 'Error updating workflow config: ' + error.message });
  }
}

// Supprimer une configuration de workflow
async function removeWorkflowConfig(req, res) {
  const { configId } = req.params;
  try {
    if (!configId) {
      return res.status(400).json({ error: 'Config ID is required' });
    }
    const deletedConfig = await workflowConfigService.removeWorkflowConfigService(configId);
    res.status(200).json(deletedConfig);
  } catch (error) {
    console.error('Error removing workflow config:', error);
    res.status(500).json({ error: error.message });
  }
}

// Obtenir une configuration de workflow par l'ID de l'objet

module.exports = {

  getAllWorkflowConfigs,
  getWorkflowConfigById,
  createWorkflowConfig,
  updateWorkflowConfig,
  removeWorkflowConfig
};
