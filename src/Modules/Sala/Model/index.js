const mongoose = require('mongoose');

const SalaSchema = new mongoose.Schema(
  {
    nome: {
        type: String
    },
    descricao: {
        type: String
    },
    capacidade: {
        type: Number
    },
    localID:{
          type: mongoose.Schema.ObjectId,
          ref: 'Local'
    }
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Sala', SalaSchema);
