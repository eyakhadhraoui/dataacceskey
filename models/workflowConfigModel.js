const mongoose = require('mongoose');

const Schema = mongoose.Schema; // This line defines Schema from mongoose

const WorkflowConfigSchema = new Schema({
  objectId: {
    type: Schema.Types.ObjectId,
    ref: 'Object',
    required: true,
  },
  approvalType: {
    type: String,
    enum: ['Owner', 'Fixed', 'Hierarchical'],
    required: true,
  },
  approvers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
});

const WorkflowConfigModel = mongoose.model('WorkflowConfig', WorkflowConfigSchema);

module.exports = WorkflowConfigModel;
