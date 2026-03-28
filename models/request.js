const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  refObject: {
    type: Schema.Types.ObjectId,
    ref: 'Object',
    required: true
  },
  requestSubject: {
    type: String,
    required: true
  },
  requestDetails: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Read', 'Write'],
    required: true
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  
  status: {
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open'
  }
});

module.exports = mongoose.model('Request', RequestSchema);
