const User = require('../Model/index');
const Cliente = require('../Model/cliente');
const Organizador = require('../Model/organizador');
const Admin = require('../Model/admin');

async function create(req, res, next) {

  const { username, email, password } = req.body;

  const validUsername = await User.find({ username: username })

  if(validUsername.length == 0){

  }else{
    return res
      .status(400)
      .json({ message: `O nome de usuario ${username} já está em uso!` });
  }

  if (req.emailInUse) {
    return res
      .status(400)
      .json({ message: `O email ${req.body.email} já está em uso!` });
  }

  const user = await User.create({
    username,
    email,
    password
  });

  user.password = null;

  return res.status(200).send('Usuario Criado!');
}

async function readOne(req, res) {
  try {
    const { _id } = req.params;

    const user = await User.findById({ _id }).select({
      password: 0,
      _id: 0,
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });

    if (!user) {
      return res.status(404).send({ message: 'usuário não foi encontrado!' });
    }

    return res.status(200).send(user);
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function remove(req, res) {
  try {
    const _id = req.userId;

    const user = await User.findByIdAndDelete({ _id });

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Esse usuário não foi encontrado!' });
    }

    return res.status(200).send({ message: 'Usuário deletado' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function isClient(req, res) {
  try {
    const _id = req.body;
    const cpf = req.body.cpf;
    const primeiroNome = req.body.primeiroNome;
    const sobrenome = req.body.sobrenome;
    const telefone = req.body.telefone;

    var cliente = await Cliente.findOne({cpf: cpf})

    if(!cliente){
      cliente = await Cliente.create({
        cpf,
        telefone
      })
    }else{
      return res
        .status(409)
        .json({ message: 'Esse cliente ja esta cadastrado!' });
    }

    cliente.nome.primeiroNome = primeiroNome
    cliente.nome.sobrenome = sobrenome

    const user = await User.findById(_id);

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Esse usuário não foi encontrado!' });
    }

    user.cliente = cliente._id

    await user.save();
    await cliente.save();

    return res.status(200).json({ message: 'Usuário atualizado' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function isOrganizador(req, res) {
  try {
    const _id = req.body;
    const nome = req.body.nome;
    const CNPJ = req.body.CNPJ;

    var organizador = await Organizador.findOne({CNPJ: CNPJ})

    if(!organizador){
      organizador = await Organizador.create({
        nome,
        CNPJ
      })
    }else{
      return res
        .status(409)
        .json({ message: 'Esse organizador ja esta cadastrado!' });
    }

    const user = await User.findById(_id);

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Esse usuário não foi encontrado!' });
    }

    user.organizador = organizador._id

    await user.save();

    return res.status(200).json({ message: 'Usuário atualizado' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

async function isAdmin(req, res) {
  try {
    const _id = req.body;
    const nome = req.body.nome;

    const admin = await Admin.create({
        nome
    })

    const user = await User.findById(_id);

    if (!user) {
      return res
        .status(404)
        .json({ message: 'Esse usuário não foi encontrado!' });
    }

    user.admin = admin._id

    await user.save();

    return res.status(200).json({ message: 'Usuário atualizado' });
  } catch ({ message }) {
    return res.status(500).json({ message });
  }
}

module.exports = {

  create,
  readOne,
  isClient,
  remove,
  isOrganizador,
  isAdmin,

};
