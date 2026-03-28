// controllers/RequestController.js
const requestService = require('../services/RequestService');

// Get all Requests
async function getAllRequests(req, res) {
  try {
    const requests = await requestService.getAllRequests();
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching all requests:', error);
    res.status(500).json({ error: error.message });
  }
}

// Get a specific Request by ID
async function getRequestById(req, res) {
  const { requestId } = req.params;
  try {
    if (!requestId) {
      return res.status(400).json({ error: 'Request ID is required' });
    }
    const request = await requestService.getRequestById(requestId);
    res.status(200).json(request);
  } catch (error) {
    console.error('Error fetching request by ID:', error);
    res.status(500).json({ error: error.message });
  }
}

// Create a new Request
async function createRequest(req, res) {
  const requestDetails = req.body;
  try {
    if (!requestDetails.user || !requestDetails.refObject || !requestDetails.requestSubject || !requestDetails.requestDetails || !requestDetails.role) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }
    const newRequest = await requestService.createRequest(requestDetails);
    res.status(201).json(newRequest);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: error.message });
  }
}

// Update an existing Request
async function updateRequest(req, res) {
  const { requestId } = req.params;
  const requestDetails = req.body;
  try {
    if (!requestId) {
      return res.status(400).json({ error: 'Request ID is required' });
    }
    const updatedRequest = await requestService.updateRequest(requestId, requestDetails);
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ error: error.message });
  }
}

// Remove a Request
async function removeRequest(req, res) {
  const { requestId } = req.params;
  try {
    if (!requestId) {
      return res.status(400).json({ error: 'Request ID is required' });
    }
    const deletedRequest = await requestService.removeRequest(requestId);
    res.status(200).json(deletedRequest);
  } catch (error) {
    console.error('Error removing request:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllRequests,
  getRequestById,
  createRequest,
  updateRequest,
  removeRequest
};
