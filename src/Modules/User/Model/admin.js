const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
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
