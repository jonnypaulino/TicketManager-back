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
    }
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Organizador', OrganizadorSchema);
