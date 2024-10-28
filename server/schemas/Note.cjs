const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  titulo: {
    type: String,
    // required: [true, 'El título es requerido'],
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  fecha: {
    type: Date
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', activitySchema);