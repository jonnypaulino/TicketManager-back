const mongoose = require('mongoose');

const IngressoSchema = new mongoose.Schema(
  {
    status: {
        type: String,
        default: 'ativo'
    },
    clienteTelefone: {
        type: String,
        ref: 'Cliente'
    },
    tipoIngressoID:{
        type: mongoose.Schema.ObjectId,
        ref: 'TipoIngresso'
    },
    eventoID:{
          type: mongoose.Schema.ObjectId,
          ref: 'Evento'
    },
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Ingresso', IngressoSchema);
