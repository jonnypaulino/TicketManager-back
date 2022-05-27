const User = require('../Model/index');

async function create(req, res) {

  try {

  const { username, email, password, func, cpf, primeiroNome, sobrenome, telefone, nomeOrganizador, cnpj, nomeAdmin } = req.body;

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

  if(func == 1){
    user.cpf = cpf;
    user.nome.primeiroNome = primeiroNome;
    user.nome.sobrenome = sobrenome;
    user.telefone.push(telefone);
    user.isCliente = true;
  }
  if(func == 2){
    user.nomeOrganizador = nomeOrganizador;
    user.cnpj = cnpj;
    user.isOrganizador = true;
  }
  if(func == 3){
    user.nomeAdmin = nomeAdmin;
    user.isAdmin = true;
  }

  await user.save();

  return res.status(200).send('Usuario Criado!');
} catch ({ message }) {
  return res.status(500).json({ message });
}
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

module.exports = {

  create,
  readOne,
  remove,

};
