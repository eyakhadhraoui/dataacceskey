const poste = require('../models/Poste'); // Adjust path if necessary
const posteService = require('../services/posteService');
// Get all users
const getAllposte = async (req, res) => {
  try {
    const postes = await posteService.getDataFromDBService();
    res.json(postes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve poste: ' + err.message });
  }
};


// Get a single user by ID
const getposteById = async (req, res) => {
  try {
    const poste = await posteService.getPosteByIdService(req.params.id);
    res.json(poste);
    if (!poste) return res.status(404).json({ message: 'poste not found' });
    res.json(poste);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve poste: ' + err.message });
  }
};


// Create a new user
const createposte = async (req, res) => {
  try {
    const newposte = new poste(req.body);
    const savedposte = await newposte.save();
    res.status(201).json(savedposte);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create poste: ' + err.message });
  }
};


// Update a user by ID
const updateposte = async (req, res) => {
  try {
    const updatedposte = await posteService.updatePosteService(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document and validate
    );
    if (!updatedposte) return res.status(404).json({ message: 'poste not found' });
    res.json(updatedposte);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update poste: ' + err.message });
  }
};


// Remove a user by ID
const removeposte = async (req, res) => {
  try {
    const deletedposte = await posteService.removePosteService(req.params.id);
    if (!deletedposte) return res.status(404).json({ message: 'poste not found' });
    res.json({ message: 'poste deleted', deletedposte });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete poste: ' + err.message });
  }
};


module.exports = {
  getAllposte,
  getposteById,
  createposte,
  updateposte,
  removeposte
};
