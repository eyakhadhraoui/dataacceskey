const departement = require('../models/departement');
const DirectorModel = require('../models/Director'); // Ensure the path is correct

// Get all directors from the database
async function getDataFromDBService() {
  try {
    const directors = await DirectorModel.find({}).populate('departement'); // Assuming 'departement' is a reference field
    return directors;
  } catch (error) {
    throw new Error('Error fetching directors from database: ' + error.message);
  }
}

// Get a specific director by ID
async function getDirectorByIdService(directorId) {
  try {
    const director = await DirectorModel.findById(directorId).populate('departement'); // Assuming 'departement' is a reference field
    if (!director) {
      throw new Error('Director not found');
    }
    return director;
  } catch (error) {
    throw new Error('Error fetching director from database: ' + error.message);
  }
}

// Create a new director
async function createDirectorService(directorDetails) {
  console.log(directorDetails);
  try {
    const newDirector = new DirectorModel({
      name: directorDetails.name,
      description: directorDetails.description,
      departement:directorDetails.departement// Assuming 'departement' is a reference field
    });

    const result = await newDirector.save();
    return result;
  } catch (error) {
    throw new Error('Error creating director in database: ' + error.message);
  }
}

// Update an existing director in the database
async function updateDirectorService(directorId, directorDetails) {
  try {
    const updatedDirector = await DirectorModel.findByIdAndUpdate(
      directorId, {
        name: directorDetails.name,
        description: directorDetails.description,
        departement:directorDetails.departement
        // Assuming 'departement' is a reference field
      },
      { new: true, runValidators: true } // Ensure updated document is returned and validation is enforced
    ).populate('departement'); // Assuming 'departement' is a reference field
    if (!updatedDirector) {
      throw new Error('Director not found');
    }
    return updatedDirector;
  } catch (error) {
    throw new Error('Error updating director in database: ' + error.message);
  }
}

// Remove a director from the database
async function removeDirectorService(directorId) {
  try {
    const deletedDirector = await DirectorModel.findByIdAndDelete(directorId);
    if (!deletedDirector) {
      throw new Error('Director not found');
    }
    return deletedDirector;
  } catch (error) {
    throw new Error('Error removing director from database: ' + error.message);
  }
}

module.exports = {
  getDataFromDBService,
  getDirectorByIdService,
  createDirectorService,
  updateDirectorService,
  removeDirectorService
};
