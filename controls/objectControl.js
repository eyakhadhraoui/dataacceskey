const objectService = require('../services/objectService');

// Get all objects
async function getAllObjects(req, res) {
  try {
    const objects = await objectService.getDataFromDBService();
    res.status(200).json(objects);
  } catch (error) {
    console.error('Error fetching all objects:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get a specific object by ID
async function getObjectById(req, res) {
  const { objectId } = req.params;
  try {
    if (!objectId) {
      return res.status(400).json({ error: 'Object ID is required' });
    }
    const object = await objectService.getObjectByIdService(objectId);
    res.status(200).json(object);
  } catch (error) {
    console.error('Error fetching object by ID:', error);
    res.status(500).json({ error: error.message });
  }
}

// Create a new object
async function createObject(req, res) {
  const objectDetails = req.body;
  try {
    // Ensure required fields are present
    if (!objectDetails.name || !objectDetails.type || !objectDetails.DataOwner) {
      return res.status(400).json({ error: 'Required object details are missing' });
    }

    const newObject = await objectService.createObjectService(objectDetails);
    res.status(201).json(newObject);
  } catch (error) {
    console.error('Error creating object:', error);
    res.status(500).json({ error: error.message });
  }
}

// Update an existing object
async function updateObject(req, res) {
  const { objectId } = req.params;
  const objectDetails = req.body;
  try {
    if (!objectId) {
      return res.status(400).json({ error: 'Object ID is required' });
    }
    const updatedObject = await objectService.updateObjectService(objectId, objectDetails);
    res.status(200).json(updatedObject);
  } catch (error) {
    console.error('Error updating object:', error);
    res.status(500).json({ error: error.message });
  }
}

// Remove an object
async function removeObject(req, res) {
  const { objectId } = req.params;
  try {
    if (!objectId) {
      return res.status(400).json({ error: 'Object ID is required' });
    }
    const deletedObject = await objectService.removeObjectService(objectId);
    res.status(200).json(deletedObject);
  } catch (error) {
    console.error('Error removing object:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllObjects,
  getObjectById,
  createObject,
  updateObject,
  removeObject
};
