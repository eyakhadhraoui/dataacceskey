const director = require('../models/Director'); // Adjust path if necessary
const directorService = require('../services/directorService');
// Get all departements
const getAlldirector = async (req, res) => {
  try {
    const directors = await directorService.getDataFromDBService();
    res.json(directors);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve director: ' + err.message });
  }
};


// Get a single departement by ID
const getdirectorById = async (req, res) => {
  try {
    const director = await directorService.getDirectorByIdService(req.params.id);
    if (!director) return res.status(404).json({ message: 'director not found' });
    res.json(director);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve director: ' + err.message });
  }
};


// Create a new departement
const createdirector = async (req, res) => {
  try {
    const newdirector = new director(req.body);
    const saveddirector = await newdirector.save();
    res.status(201).json(saveddirector);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create director: ' + err.message });
  }
};


// Update a departement by ID
const updatedirector = async (req, res) => {
  try {
    const updateddirector = await directorService.updateDirectorService(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document and validate
    );
    if (!updateddirector) return res.status(404).json({ message: 'director not found' });
    res.json(updateddirector);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update director: ' + err.message });
  }
};


// Remove a departement by ID
const removedirector = async (req, res) => {
  try {
    const deleteddirector = await directorService.removeDirectorService(req.params.id);
    if (!deleteddirector) return res.status(404).json({ message: 'director not found' });
    res.json({ message: 'director deleted', deleteddirector });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete director: ' + err.message });
  }
};


module.exports = {
  getAlldirector,
  getdirectorById,
  createdirector,
  updatedirector,
  removedirector
};
