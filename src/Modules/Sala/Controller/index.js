const Sala = require('../Model/index')
const Local = require('../../Local/Model/index')

async function createSala(req, res) {

try {

const { nome, descricao, capacidade, localID } = req.body;

const sala = await Sala.create({
    nome: nome,
    descricao: descricao,
    capacidade: capacidade,
    localID: localID
})

return res.status(200).json('Sala criada!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

module.exports = {

    createSala,

};