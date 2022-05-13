const mongoose = require('mongoose');

const EnderecoSchema = new mongoose.Schema(
  {
    nome: {
        type: String,
        required: true
    },
    cep:{
        type: Number
    },
    rua:{
        type: String
    },
    bairro:{
        type: String
    },
    estado:{
        type: String
    },
    pais:{
        type: String
    },
    numero:{
        type: Number
    },
    complemento:{
        type: String
    },
    locais:{
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

module.exports = mongoose.model('Endereco', EnderecoSchema);
