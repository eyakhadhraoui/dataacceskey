const role = require('../models/Role'); // Adjust path if necessary

// Get all roles
const getAllroles = async (req, res) => {
  try {
    const roles = await role.find().populate('user'); // Assuming 'departement' is a reference field
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve roles: ' + err.message });
  }
};

// Get a single role by ID
const getroleById = async (req, res) => {
  try {
    const role = await role.findById(req.params.id).populate('departement');
    if (!role) return res.status(404).json({ message: 'role not found' });
    res.json(role);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve role: ' + err.message });
  }
};

// Create a new role
const createrole = async (req, res) => {
    console.log(req.body)
  try {
    const newrole = new role(req.body);
    const savedrole = await newrole.save();
    res.status(201).json(savedrole);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create role: ' + err.message });
  }
};

// Update a role by ID
const updaterole = async (req, res) => {
  try {
    const updatedrole = await role.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document and validate
    ).populate('user');
    if (!updatedrole) return res.status(404).json({ message: 'role not found' });
    res.json(updatedrole);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update role: ' + err.message });
  }
};

// Remove a role by ID
const removerole = async (req, res) => {
  try {
    const deletedrole = await role.findByIdAndDelete(req.params.id);
    if (!deletedrole) return res.status(404).json({ message: 'role not found' });
    res.json({ message: 'role deleted', deletedrole });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete role: ' + err.message });
  }
};

module.exports = {
  getAllroles,
  getroleById,
  createrole,
  updaterole,
  removerole
};
