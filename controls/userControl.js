const userService = require('../services/userService');
const user =require('../models/userModel');
const Poste = require('../models/Poste');


exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getDataFromDBService();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve users: ' + err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserByIdService(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve user: ' + err.message });
    }
};

exports.create


// Create a new user
exports.createUser = async (req, res) => {
    try {
        const newUser = await userService.createUserDBService(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create user: ' + err.message });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUserDBService(req.params.id, req.body);
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update user: ' + err.message });
    }
};

// Remove a user by ID
exports.removeUser = async (req, res) => {
    try {
        const deletedUser = await userService.removeUserDBService(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted', deletedUser });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user: ' + err.message });
    }
};
  