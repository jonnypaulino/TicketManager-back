const Local = require('../Model/index')

async function createLocal(req, res) {

try {

const { nome, enderecoID } = req.body;

const local = await Local.create({
    nome: nome,
    endereco: enderecoID
})

return res.status(200).json('Local criado!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

module.exports = {

    createLocal,

};