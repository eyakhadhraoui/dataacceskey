const mongoose = require('mongoose');

const userRequestValiSchema = new mongoose.Schema({
  iddata:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DataApprovalRequest', // Référence au modèle WorkflowConfig
    required: true
  },
  idworkflow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkflowConfig', // Référence au modèle WorkflowConfig
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  requestdate: {
    type: Date,
    default: Date.now
  },
  approvaldate: {
    type: Date,
    default: null
  },
  approvaltexte: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // Ajoute createdAt et updatedAt automatiquement
});

const UserRequestVali = mongoose.model('UserRequestVali', userRequestValiSchema);

module.exports = UserRequestVali;
