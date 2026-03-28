const mongoose = require('mongoose');

const departementSchema = new mongoose.Schema({
    name: { type: String, required: true },
director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
        required: true
      } 
      
      // Assuming 'directeur' is a string
});

module.exports = mongoose.model('departement', departementSchema);
