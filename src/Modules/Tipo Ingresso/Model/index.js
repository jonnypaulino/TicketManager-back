const mongoose = require('mongoose');

const TipoIngressoSchema = new mongoose.Schema(
  {
    titulo: {
        type: String,
    },
    valorBase: {
        type: Number,
    },
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('TipoIngresso', TipoIngressoSchema);
