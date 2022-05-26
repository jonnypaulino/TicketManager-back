const Ingresso = require('../Model/index')
const User = require('../../User/Model/index')

async function createIngresso(req, res) {

try {

const { tipoIngressoNumber, quantidade, valorFinal, userID, eventoID } = req.body;

var tipoIngresso;

if(tipoIngressoNumber == 1){
    tipoIngresso = 'Assento Norte';
}
if(tipoIngressoNumber == 2){
    tipoIngresso = 'Assento Sul';
}
if(tipoIngressoNumber == 3){
    tipoIngresso = 'Assento Leste';
}
if(tipoIngressoNumber == 4){
    tipoIngresso = 'Assento Oeste';
}
if(tipoIngressoNumber == 5){
    tipoIngresso = 'Assento Camarote';
}

const ingresso = await Ingresso.create({
    tipoIngresso: tipoIngresso,
    quantidade: quantidade,
    valorFinal: valorFinal,
    evento: eventoID
})

await User.findByIdAndUpdate(userID, {
    $push: {
        carrinhoCliente: ingresso._id
    }
})

return res.status(200).json('Ingresso adicionado ao carrinho!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

module.exports = {

    createIngresso,

};