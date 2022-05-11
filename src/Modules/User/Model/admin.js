const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
  {
    nome: {
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

module.exports = mongoose.model('Admin', AdminSchema);
