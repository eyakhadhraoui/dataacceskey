const mongoose = require('mongoose');

const posteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    departement: { type: mongoose.Schema.Types.ObjectId, ref: 'departement', required: true },
  
});




module.exports = mongoose.model('poste', posteSchema);
