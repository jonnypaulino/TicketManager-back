const Endereco = require('../Model/index')

async function createEndereco(req, res) {

try {

const { nome, cep, rua, bairro, estado, pais, numero, complemento } = req.body;

if(!admin){
    return res
        .status(404)
        .json({ message: 'Admin não foi encontrado!' });
}

const endereco = await Endereco.create({
    nome: nome,
    cep: cep,
    rua: rua,
    bairro: bairro,
    estado: estado,
    pais: pais,
    numero: numero,
    complemento: complemento,
})

return res.status(200).json('Endereco criado!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

module.exports = {

    createEndereco,

};