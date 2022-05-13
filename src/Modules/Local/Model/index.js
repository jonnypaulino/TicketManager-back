const mongoose = require('mongoose');

const LocalSchema = new mongoose.Schema(
  {
    nome: {
        type: String,
        required: true
    },
    endereco:{
        type: mongoose.Schema.ObjectId,
        ref: 'Evento'
    }
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Local', LocalSchema);
