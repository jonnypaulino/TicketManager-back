const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema(
  {
    titulo: {
        type: String
    },
    descricao: {
        type: String
    },
    dates: [
        {
            type: Date,
        }
    ],
    categoriaID:{
          type: mongoose.Schema.ObjectId,
          ref: 'Categoria'
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
