const Ingresso = require('../Model/index')

async function createIngresso(req, res) {

try {

const { clienteTelefone, tipoIngressoID, eventoID } = req.body;

const ingresso = await Ingresso.create({
    clienteTelefone: clienteTelefone,
    tipoIngressoID: tipoIngressoID,
    eventoID: eventoID,
})

return res.status(200).json('Ingresso criado!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

async function updateStatus(req, res) {

    try {
    
    const { ingressoID, status } = req.body;
    
    const ingresso = await Ingresso.findByIdAndUpdate(ingressoID, {
        $set: {
            status: status
        }
    });

    if(!ingresso){
        return res.status(404).json('Ingresso nao encontrado!');
    }
    
    return res.status(200).json('Ingresso atualizado!');
    
    } catch ({ message }) {
    return res.status(500).json({ message });
    }
}

module.exports = {

    createIngresso,
    updateStatus,

};