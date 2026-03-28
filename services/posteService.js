const poste = require('../models/Poste');  // Ensure the path is correct

// Get all postes from the database
async function getDataFromDBService() {
  try {
    const postes = await poste.find({}).populate('departement'); // Assuming 'departement' is a reference field
    return postes;
  } catch (error) {
    throw new Error('Error fetching postes from database: ' + error.message);
  }
}

// Get a specific poste by ID
async function getPosteByIdService(posteId) {
  try {
    const poste = await poste.findById(posteId).populate('departement'); // Assuming 'departement' is a reference field
    if (!poste) {
      throw new Error('Poste not found');
    }
    return poste;
  } catch (error) {
    throw new Error('Error fetching poste from database: ' + error.message);
  }
}

// Create a new poste
async function createPosteService(posteDetails) {
     console.log(posteDetails)
  try {
    const newPoste = new poste({
      name: posteDetails.name,
      description: posteDetails.description,
      departement: posteDetails.departement // Assuming 'departement' is a reference field
    });
   
    const result = await newPoste.save();
    return result;
  } catch (error) {
    throw new Error('Error creating poste in database: ' + error.message);
  }
}

// Update an existing poste in the database
async function updatePosteService(posteId, posteDetails) {
  try {
    const updatedPoste = await poste.findByIdAndUpdate(
      posteId, {
        name: posteDetails.name,
        description: posteDetails.description,
        departement: posteDetails.departement // Assuming 'departement' is a reference field
      },
      { new: true, runValidators: true } // Ensure updated document is returned and validation is enforced
    ).populate('departement'); // Assuming 'departement' is a reference field
    if (!updatedPoste) {
      throw new Error('Poste not found');
    }
    return updatedPoste;
  } catch (error) {
    throw new Error('Error updating poste in database: ' + error.message);
  }
}

// Remove a poste from the database
async function removePosteService(posteId) {
  try {
    const deletedPoste = await poste.findByIdAndDelete(posteId);
    if (!deletedPoste) {
      throw new Error('Poste not found');
    }
    return deletedPoste;
  } catch (error) {
    throw new Error('Error removing poste from database: ' + error.message);
  }
}

module.exports = {
  getDataFromDBService,
  getPosteByIdService,
  createPosteService,
  updatePosteService,
  removePosteService
};
