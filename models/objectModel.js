const mongoose = require('mongoose');

const ObjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  DataOwner: {
    ownerModel: { type: String, enum: ['User', 'Departement'], required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, refPath: 'DataOwner.ownerModel', required: true }
  }});
const ObjectModel = mongoose.model('Object', ObjectSchema);

module.exports = ObjectModel;