const User = require('../models/userModel');

// Function to get the user hierarchy based on a given user ID
async function getUserHierarchy(userId) {
  try {
    const user = await User.findById(userId).populate('nPlus1 nPlus2');
    if (!user) {
      throw new Error('User not found');
    }

    // Return hierarchical information
    return {
      nPlus1: user.nPlus1,
      nPlus2: user.nPlus2,
    };
  } catch (error) {
    throw new Error('Error fetching user hierarchy: ' + error.message);
  }
}

module.exports = {
  getUserHierarchy,
};
