const departement = require('../models/departement');  // Ensure the path is correct

// Get all departements from the database
async function getDataFromDBService() {
  try {
    const departements = await departement.find({}).populate('director'); // Assuming 'departement' is a reference field
    return departements;
  } catch (error) {
    throw new Error('Error fetching departements from database: ' + error.message);
  }
}

// Get a specific departement by ID
async function getdepartementByIdService(departementId) {
  try {
    const departement = await departement.findById(departementId).populate('director'); // Assuming 'departement' is a reference field
    if (!departement) {
      throw new Error('departement not found');
    }
    return departement;
  } catch (error) {
    throw new Error('Error fetching departement from database: ' + error.message);
  }
}

// Create a new departement
async function createdepartementService(departementDetails) {
     console.log(departementDetails)
  try {
    const newdepartement = new departement({
      name: departementDetails.name,
      director: departementDetails.director// Assuming 'departement' is a reference field
    });
   
    const result = await newdepartement.save();
    return result;
  } catch (error) {
    throw new Error('Error creating departement in database: ' + error.message);
  }
}

// Update an existing departement in the database
async function updatedepartementService(departementId, departementDetails) {
  try {
    const updateddepartement = await departement.findByIdAndUpdate(
      departementId, {
        name: departementDetails.name,
        description: departementDetails.description,
        director:departementDetails.director
        // Assuming 'departement' is a reference field
      },
      { new: true, runValidators: true } // Ensure updated document is returned and validation is enforced
    ).populate('director'); // Assuming 'departement' is a reference field
    if (!updateddepartement) {
      throw new Error('departement not found');
    }
    return updateddepartement;
  } catch (error) {
    throw new Error('Error updating departement in database: ' + error.message);
  }
}


// Remove a departement from the database
async function removedepartementService(departementId) {
  try {
    const deleteddepartement = await departement.findByIdAndDelete(departementId);
    if (!deleteddepartement) {
      throw new Error('Departement not found');
    }
    return deleteddepartement;
  } catch (error) {
    throw new Error('Error removing departement from database: ' + error.message);
  }
}

module.exports = {
  getDataFromDBService,
  getdepartementByIdService,
  createdepartementService,
  updatedepartementService,
  removedepartementService
};
