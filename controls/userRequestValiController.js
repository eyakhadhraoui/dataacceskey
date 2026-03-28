const userRequestValiService=require('../services/userRequestValiService');



// Controller to handle approving a user request vali
const approveUserRequestVali = async (req, res) => {
  try {
    const { valiId } = req.params;  // ID of the UserRequestVali document
    const { approverId, approvalDetails } = req.body;  // Expect approverId and approval details in the request body

    if (!approverId) {
      return res.status(400).json({ error: 'Approver ID is required' });
    }

    // Call the service to handle the approval process
    const result = await userRequestValiService.approveUserRequestVali(valiId, approverId, approvalDetails);
    
    // Return the result
    res.status(200).json(result);
  } catch (error) {
    console.error('Error approving user request vali:', error.message);
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  approveUserRequestVali,
};

