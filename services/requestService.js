// services/RequestService.js
const Request = require('../models/Request'); // Import your Request model

// Get all Requests
async function getAllRequests() {
  try {
    return await Request.find({});
  } catch (error) {
    throw new Error('Error fetching requests: ' + error.message);
  }
}

// Get a specific Request by ID
async function getRequestById(requestId) {
  try {
    const request = await Request.findById(requestId);
    if (!request) {
      throw new Error('Request not found');
    }
    return request;
  } catch (error) {
    throw new Error('Error fetching request: ' + error.message);
  }
}

// Create a new Request
async function createRequest(requestDetails) {
  try {
    const newRequest = new Request(requestDetails);
    return await newRequest.save();
  } catch (error) {
    throw new Error('Error creating request: ' + error.message);
  }
}

// Update an existing Request
async function updateRequest(requestId, requestDetails) {
  try {
    const updatedRequest = await Request.findByIdAndUpdate(requestId, requestDetails, { new: true, runValidators: true });
    if (!updatedRequest) {
      throw new Error('Request not found');
    }
    return updatedRequest;
  } catch (error) {
    throw new Error('Error updating request: ' + error.message);
  }
}

// Remove a Request
async function removeRequest(requestId) {
  try {
    const deletedRequest = await Request.findByIdAndDelete(requestId);
    if (!deletedRequest) {
      throw new Error('Request not found');
    }
    return deletedRequest;
  } catch (error) {
    throw new Error('Error removing request: ' + error.message);
  }
}

module.exports = {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  removeRequest
};
