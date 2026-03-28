const mongoose = require('mongoose');

const DirectorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description : { type: String, required: true },
    departement: { type: mongoose.Schema.Types.ObjectId, ref: 'departement', required: true },
   // Associate by name or unique identifier
});


module.exports = mongoose.model('Director', DirectorSchema);
