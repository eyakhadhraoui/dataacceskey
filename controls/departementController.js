const departement = require('../models/departement'); // Adjust path if necessary
const departementService = require('../services/departementService');
// Get all users
const getAlldepartement = async (req, res) => {
  try {
    const departements = await departementService.getDataFromDBService();
    res.json(departements);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve departement: ' + err.message });
  }
};


// Get a single user by ID
const getdepartementById = async (req, res) => {
  try {
    const departement = await departementService.getdepartementByIdService(req.params.id);
    if (!departement) return res.status(404).json({ message: 'departement not found' });
    res.json(departement);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve departement: ' + err.message });
  }
};


// Create a new user
const createdepartement = async (req, res) => {
  try {
    const newdepartement = new departement(req.body);
    const saveddepartement = await newdepartement.save();
    res.status(201).json(saveddepartement);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create departement: ' + err.message });
  }
};


// Update a user by ID
const updatedepartement = async (req, res) => {
  try {
    const updateddepartement = await departementService.updatedepartementService(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document and validate
    );
    if (!updateddepartement) return res.status(404).json({ message: 'departement not found' });
    res.json(updateddepartement);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update departement: ' + err.message });
  }
};


// Remove a user by ID
const removedepartement = async (req, res) => {
  try {
    const deleteddepartement = await departementService.removedepartementService(req.params.id);
    if (!deleteddepartement) return res.status(404).json({ message: 'Departement not found' });
    res.json({ message: 'Departement deleted', deleteddepartement });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete departement: ' + err.message });
  }
};


module.exports = {
  getAlldepartement,
  getdepartementById,
  createdepartement,
  updatedepartement,
  removedepartement
};
