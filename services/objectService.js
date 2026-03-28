const ObjectModel = require('../models/objectModel');

// Get all objects from the database
async function getDataFromDBService() {
  try {
    const objects = await ObjectModel.find({});
    return objects;
  } catch (error) {
    throw new Error('Error fetching objects from database: ' + error.message);
  }
}

// Get a specific object by ID
async function getObjectByIdService(objectId) {
  try {
    if (!objectId) {
      throw new Error('Object ID is required');
    }
    const object = await ObjectModel.findById(objectId);
    if (!object) {
      throw new Error(`Object not found with ID: ${objectId}`);
    }
    return object;
  } catch (error) {
    throw new Error('Error fetching object from database: ' + error.message);
  }
}

// Create a new object in the database
async function createObjectService(objectDetails) {
  try {
    if (!objectDetails.name || !objectDetails.type || !objectDetails.DataOwner) {
      throw new Error('Required object details are missing');
    }

    const newObject = new ObjectModel({
      name: objectDetails.name,
      description: objectDetails.description,
      type: objectDetails.type,
      DataOwner: {
        ownerModel: objectDetails.DataOwner.ownerModel,
        ownerId: objectDetails.DataOwner.ownerId
      }
    });

    const result = await newObject.save();
    return result;
  } catch (error) {
    throw new Error('Error creating object in database: ' + error.message);
  }
}

// Update an existing object in the database
async function updateObjectService(objectId, objectDetails) {
  try {
    if (!objectId) {
      throw new Error('Object ID is required');
    }
    const updatedObject = await ObjectModel.findByIdAndUpdate(
      objectId,
      {
        name: objectDetails.name,
        description: objectDetails.description,
        type: objectDetails.type,
        DataOwner: {
          ownerModel: objectDetails.DataOwner.ownerModel,
          ownerId: objectDetails.DataOwner.ownerId
        }
      },
      { new: true, runValidators: true } // Ensure updated document is returned and validation is enforced
    );
    if (!updatedObject) {
      throw new Error(`Object not found with ID: ${objectId}`);
    }
    return updatedObject;
  } catch (error) {
    throw new Error('Error updating object in database: ' + error.message);
  }
}

// Remove an object from the database
async function removeObjectService(objectId) {
  try {
    if (!objectId) {
      throw new Error('Object ID is required');
    }
    const deletedObject = await ObjectModel.findByIdAndDelete(objectId);
    if (!deletedObject) {
      throw new Error(`Object not found with ID: ${objectId}`);
    }
    return deletedObject;
  } catch (error) {
    throw new Error('Error removing object from database: ' + error.message);
  }
}

module.exports = {
  getDataFromDBService,
  getObjectByIdService,
  createObjectService,
  updateObjectService,
  removeObjectService
};
