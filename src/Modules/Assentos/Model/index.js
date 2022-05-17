const mongoose = require('mongoose');

const AssentoSchema = new mongoose.Schema(
  {
    descricao: {
        type: String
    },
    status: {
        type: String,
        default: 'inativo'
    },
    salaID:{
          type: mongoose.Schema.ObjectId,
          ref: 'Sala'
    },
    salaLocalID:{
        type: mongoose.Schema.ObjectId,
        ref: 'Local'
    },
    tipoIngressoID:{
        type: mongoose.Schema.ObjectId,
        ref: 'TipoIngresso'
    },
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Assento', AssentoSchema);
