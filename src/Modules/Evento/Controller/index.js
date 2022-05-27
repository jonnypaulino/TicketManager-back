const User = require('../../User/Model/index');
const Evento = require('../Model/index')

async function createEvento(req, res) {

try {

const { time1, time2, data, descricao, localName, localNumber, localComplement, cep, rua, bairro, estado, pais , capacidadeN, valorN,
        capacidadeS, valorS, capacidadeL, valorL, capacidadeO, valorO, capacidadeC, valorC, userID } = req.body;

var user = await User.findById(userID);

if(!user){
    return res
        .status(404)
        .json({ message: 'Usuario não foi encontrado!' });
}

if(user.isOrganizador == false){
    return res
        .status(409)
        .json({ message: 'Usuario não eh organizador!' });
}

var titulo = `${time1} X ${time2}`

const evento = await Evento.create({
    titulo: titulo,
    descricao: descricao,
    data: data,
})

evento.local.localName = localName;
evento.local.localNumber = localNumber;
evento.local.localComplement = localComplement;
evento.endereco.cep = cep;
evento.endereco.rua = rua;
evento.endereco.bairro = bairro;
evento.endereco.estado = estado;
evento.endereco.pais = pais;
evento.assentoNorte.capacidadeN = capacidadeN;
evento.assentoNorte.valorN = valorN;
evento.assentoSul.capacidadeS = capacidadeS;
evento.assentoSul.valorS = valorS;
evento.assentoLeste.capacidadeL = capacidadeL;
evento.assentoLeste.valorL = valorL;
evento.assentoOeste.capacidadeO = capacidadeO;
evento.assentoOeste.valorO = valorO;
evento.assentoCamarote.capacidadeC = capacidadeC;
evento.assentoCamarote.valorC = valorC;

await evento.save();

await User.findByIdAndUpdate(userID, {
    $push:{
        eventosOrganizador: evento._id
    }
})

return res.status(200).json('Evento criado!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

async function updateEvento(req, res) {

try {

const { data, userID, eventoID } = req.body;

const user = await User.findById(userID);

if(user.eventosOrganizador.includes(eventoID) == false){
    return res
        .status(403)
        .json({ message: 'Voce nao possui tal permissao!' });
}

await Evento.findByIdAndUpdate(eventoID, {
    $set:{
        data: data
    }
})

return res.status(200).json('Evento atualizado!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

async function removeEvento(req, res) {

try {

const { userID, eventoID } = req.body;

const user = await User.findById(userID);

if(user.eventosOrganizador.includes(eventoID) == false){
    return res
        .status(403)
        .json({ message: 'Voce nao possui tal permissao!' });
}

await Evento.findByIdAndRemove(eventoID);

user.eventosOrganizador.pull(eventoID);

await user.save();

return res.status(200).json('Evento removido!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

async function readEventos(req, res) {

try {

const eventos = await Evento.find();

return res.status(200).json(eventos);

} catch ({ message }) {
return res.status(500).json({ message });
}
}

async function readOneEvento(req, res) {

try {

const { eventoID } = req.params;

const evento = await Evento.findById(eventoID);

if(!evento){
    return res
        .status(404)
        .json({ message: 'Evento não foi encontrado!' });
}

return res.status(200).json(evento);
} catch ({ message }) {
return res.status(500).json({ message });
}
}

async function readEventosFromOrganizador(req, res) {

    try {

    const { userID } = req.params;
    
    const user = await User.findById(userID).populate('eventosOrganizador');
    
    if(!user){
        return res
            .status(404)
            .json({ message: 'Usuario não foi encontrado!' });
    }

    return res.status(200).json(user.eventosOrganizador);
    
    } catch ({ message }) {
    return res.status(500).json({ message });
    }
    }

module.exports = {

    createEvento,
    updateEvento,
    removeEvento,
    readEventos,
    readOneEvento,
    readEventosFromOrganizador,

};