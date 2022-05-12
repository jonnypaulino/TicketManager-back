const mongoose = require('mongoose');

const OrganizadorSchema = new mongoose.Schema(
  {
    nome: {
        type: String,
        required: true,
    },
    CNPJ: {
        type: String,
        required: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
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

module.exports = mongoose.model('Organizador', OrganizadorSchema);
