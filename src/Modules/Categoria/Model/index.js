const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema(
  {
    nome: {
        type: String,
        required: true
    },
    lastMod:{
        type: Date
    },
    eventos: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Evento'
        }
    ]
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Categoria', CategoriaSchema);
