const mongoose = require('mongoose');

const IngressoSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: 'ativo'
    },
    envento: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Evento'
    },
    tipoIngresso: {
      type: String,
    },
    quantidade: {
      type: Number,
    },
    valorFinal: {
      type: Number,
    },
    tipoPagamento: {
      type: String,
    },
    cartao: {
      numero:{
        type: String
      },
      titular: {
        type: String
      },
      cpf: {
        type: String
      },
      data: {
        type: Date
      }
    },
    boleto: {
      type: String
    },
    pix: {
      qrCode: {
        type: Array
      },
      copyPaste: {
        type: String
      }
    },
    foiPago: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Ingresso', IngressoSchema);
