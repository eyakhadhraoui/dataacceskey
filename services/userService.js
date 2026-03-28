// services/userService.js
const UserModel = require('../models/userModel');
const Poste = require('../models/Poste');

async function getDataFromDBService() {
    try {
        const users = await UserModel.find({})
            .populate('director', 'name')
            .populate('poste', 'name')
            .populate('departement', 'name')
            .populate('nPlus1', 'name')
            .populate('nPlus2', 'name');
        return users;
    } catch (error) {
        throw new Error('Error fetching users from database: ' + error.message);
    }
}

async function getUserByIdService(userId) {
    try {
        const user = await UserModel.findById(userId)
            .populate('director', 'name')
            .populate('poste', 'name')
            .populate('departement', 'name')
            .populate('nPlus1', 'name')
            .populate('nPlus2', 'name');
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        throw new Error('Error fetching user from database: ' + error.message);
    }
}

async function createUserDBService(userDetails) {
    try {
        const newUser = new UserModel({
            name: userDetails.name,
            address: userDetails.address,
            phone: userDetails.phone,
            email: userDetails.email,
            age: userDetails.age,
            director: userDetails.director,
            poste: userDetails.poste,
            departement: userDetails.departement,
            nPlus1: userDetails.nPlus1,
            nPlus2: userDetails.nPlus2,
            password: userDetails.password,
        });

        const result = await newUser.save();
        return result;
    } catch (error) {
        throw new Error('Error creating user in database: ' + error.message);
    }
}

async function updateUserDBService(userId, userDetails) {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                name: userDetails.name,
                address: userDetails.address,
                phone: userDetails.phone,
                email: userDetails.email,
                age: userDetails.age,
                director: userDetails.director,
                poste: userDetails.poste,
                departement: userDetails.departement,
                nPlus1: userDetails.nPlus1,
                nPlus2: userDetails.nPlus2,
                password: userDetails.password,
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    } catch (error) {
        throw new Error('Error updating user in database: ' + error.message);
    }
}

async function removeUserDBService(userId) {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        return deletedUser;
    } catch (error) {
        throw new Error('Error removing user from database: ' + error.message);
    }
}

module.exports = {
    getDataFromDBService,
    getUserByIdService,
    createUserDBService,
    updateUserDBService,
    removeUserDBService,
};
