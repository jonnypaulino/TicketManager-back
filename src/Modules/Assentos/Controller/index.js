const Assento = require('../Model/index')

async function createAssento(req, res) {

try {

const { descricao, salaID, salaLocalID, tipoIngressoID } = req.body;

const assento = await Assento.create({
    descricao: descricao,
    salaID: salaID,
    salaLocalID: salaLocalID,
    tipoIngressoID: tipoIngressoID
})

return res.status(200).json('Assento criado!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

async function updateStatus(req, res) {

    try {
    
    const { assentoID } = req.body;
    
    const assento = await Assento.findByIdAndUpdate(assentoID, {
        $set: {
            status: 'ativo'
        }
    });

    if(!assento){
        return res.status(404).json('Assento nao encontrado!');
    }
    
    return res.status(200).json('Assento atualizado!');
    
    } catch ({ message }) {
    return res.status(500).json({ message });
    }
    }

module.exports = {

    createAssento,
    updateStatus,

};