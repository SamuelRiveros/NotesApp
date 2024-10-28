const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    nota: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('history', historySchema);
