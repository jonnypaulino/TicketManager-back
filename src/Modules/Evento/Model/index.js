const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema(
  {
    titulo: {
        type: String
    },
    descricao: {
        type: String
    },
    data: {
      type: Date
    },
    categoriaName: {
      type: String,
      default: 'Futebol'
    },
    lastMod: {
      type: Date,
      default: Date.now
    },
    local: {
      localName: {
        type: String
      },
      localNumber: {
        type: Number
      },
      localComplement: {
        type: String
      }
    },
    endereco: {
      cep: {
        type: String
      },
      rua: {
        type: String
      },
      bairro: {
        type: String
      },
      estado: {
        type: String
      },
      pais: {
        type: String
      }
    },
    assentoNorte: {
      capacidadeN: {
        type: Number
      },
      valorN: {
        type: Number
      }
    },
    assentoSul: {
      capacidadeS: {
        type: Number
      },
      valorS: {
        type: Number
      }
    },
    assentoLeste: {
      capacidadeL: {
        type: Number
      },
      valorL: {
        type: Number
      }
    },
    assentoOeste: {
      capacidadeO: {
        type: Number
      },
      valorO: {
        type: Number
      }
    },
    assentoCamarote: {
      capacidadeC: {
        type: Number
      },
      valorC: {
        type: Number
      }
    }
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Evento', EventoSchema);
