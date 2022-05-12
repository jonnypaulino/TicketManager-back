const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema(
  {
    cpf: {
      type: Number,
      required: false,
      unique: true,
    },
    nome: {
        primeiroNome:{
            type: String,
            default: ''
        },
        sobrenome:{
            type: String,
            default: ''
        }
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    telefone: [
        {
            type: String,
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

module.exports = mongoose.model('Cliente', ClientSchema);
