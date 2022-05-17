const TipoIngresso = require('../Model/index')

async function createTipoIngresso(req, res) {

try {

const { titulo, valorBase } = req.body;

const tipoIngresso = await TipoIngresso.create({
    titulo: titulo,
    valorBase: valorBase,
})

return res.status(200).json('Tipo Ingresso criado!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

module.exports = {

    createTipoIngresso,

};