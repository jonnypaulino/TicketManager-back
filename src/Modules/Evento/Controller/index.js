const Organizador = require('../../User/Model/organizador');
const Evento = require('../Model/index')
const Categoria = require('../../Categoria/Model/index')

async function createEvento(req, res) {

try {

const { titulo, descricao, date, organizadorID, categoriaID } = req.body;

var organizador = await Organizador.findById(organizadorID);

if(!organizador){
    return res
        .status(404)
        .json({ message: 'Organizador não foi encontrado!' });
}

const evento = await Evento.create({
    titulo,
    descricao,
    dates: date,
    categoriaID: categoriaID
})

await Categoria.findByIdAndUpdate(categoriaID, {
    $push:{
        eventos: evento._id
    }
})

await Organizador.findByIdAndUpdate(organizadorID, {
    $push:{
        eventos: evento._id
    }
})

return res.status(200).json('Evento criado!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

async function updateEvento(req, res) {

try {

const { date, organizadorID, eventoID } = req.body;

const organizador = await Organizador.findById(organizadorID);

if(organizador.eventos.includes(eventoID) == false){
    return res
        .status(403)
        .json({ message: 'Voce nao possui tal permissao!' });
}

const evento = await Evento.findByIdAndUpdate(eventoID, {
    $push:{
        dates: date
    }
})

return res.status(200).json('Evento atualizado!');

} catch ({ message }) {
return res.status(500).json({ message });
}
} 

module.exports = {

    createEvento,
    updateEvento,

};