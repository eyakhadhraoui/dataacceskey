const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      description: {
        type: String,
        required: true
      }

});

module.exports = mongoose.model('Role', RoleSchema);
