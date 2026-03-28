const Role = require('../models/Role'); // Ensure the path is correct

// Get all roles from the database
async function getDataFromDBService() {
  try {
    const roles = await Role.find({}).populate('user'); // Populate 'user' field if it's a reference
    return roles;
  } catch (error) {
    throw new Error('Error fetching roles from database: ' + error.message);
  }
}

// Get a specific role by ID
async function getRoleByIdService(roleId) {
  try {
    const role = await Role.findById(roleId).populate('user'); // Populate 'user' field if it's a reference
    if (!role) {
      throw new Error('Role not found');
    }
    return role;
  } catch (error) {
    throw new Error('Error fetching role from database: ' + error.message);
  }
}

// Create a new role
async function createRoleService(roleDetails) {
  try {
    const newRole = new RoleModel({
      nom: roleDetails.nom,
      user: roleDetails.user ,
      description: roleDetails.description // Ensure this field is correct
    });
   
    const result = await newRole.save();
    return result;
  } catch (error) {
    throw new Error('Error creating role in database: ' + error.message);
  }
}

// Update an existing role in the database
async function updateRoleService(roleId, roleDetails) {
  try {
    const updatedRole = await Role.findByIdAndUpdate(
      roleId, {
        nom: roleDetails.nom,
        user: roleDetails.user ,
        description: roleDetails.description /// Ensure this field is correct
      },
      { new: true, runValidators: true } // Ensure updated document is returned and validation is enforced
    ).populate('user'); // Populate 'user' field if it's a reference
    if (!updatedRole) {
      throw new Error('Role not found');
    }
    return updatedRole;
  } catch (error) {
    throw new Error('Error updating role in database: ' + error.message);
  }
}

// Remove a role from the database
async function removeRoleService(roleId) {
  try {
    const deletedRole = await Role.findByIdAndDelete(roleId);
    if (!deletedRole) {
      throw new Error('Role not found');
    }
    return deletedRole;
  } catch (error) {
    throw new Error('Error removing role from database: ' + error.message);
  }
}

module.exports = {
  getDataFromDBService,
  getRoleByIdService,
  createRoleService,
  updateRoleService,
  removeRoleService
};
