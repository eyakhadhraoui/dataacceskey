// models/userModel.js
const mongoose = require('mongoose');
const Poste = require('../models/Poste');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Assuming director is another user
        required: true,
    },
    poste: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'poste',
        required: true,
    },
    departement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'departement',
        required: true,
    },
    nPlus1: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // N+1 is also a reference to another User
    nPlus2: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
