const express = require('express');
const router = express.Router();
const requestController = require('../controls/requestcontrol');



router.get('/request', requestController.getAllRequests);
router.get('/request/:requestId', requestController.getRequestById);
router.post('/request/create', requestController.createRequest);

router.put('/request/update/:requestId', requestController.updateRequest);
router.delete('/request/remove/:requestId', requestController.removeRequest);


module.exports = router;
