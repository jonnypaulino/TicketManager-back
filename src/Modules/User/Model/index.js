const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 32
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cpf:{
      type: String,
      required: false
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
    telefone: [
      {
          type: String,
          required: false
      }
    ],
    nomeOrganizador: {
      type: String
    },
    cnpj: {
      type: String
    },
    nomeAdmin: {
      type: String
    },
    isCliente: {
      type: Boolean,
      default: false
    },
    isOrganizador: {
      type: Boolean,
      default: false
    },
    isAdmin:{
      type: Boolean,
      default: false
    },
    eventosOrganizador: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Evento'
      }
    ],
    carrinhoCliente: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Ingresso'
    },
    ingressosCliente:[
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Ingresso'
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

const salt = 10;

UserSchema.pre('save', async function crypt(next) {
  if (this.isModified('password')) {
    this.password = await this.encryptPassword(this.password);
  }
  return next();
});

UserSchema.pre('updateOne', async function recovery(next) {
  if (this._update.password) {
    this._update.password = await this.schema.methods.encryptPassword(
      this._update.password,
    );
  }
  return next();
});

UserSchema.methods = {
  authenticate(password) {
    return bcrypt.compareSync(password, this.password);
  },
  encryptPassword(password) {
    return bcrypt.hashSync(password, salt);
  },
};

module.exports = mongoose.model('User', UserSchema);
