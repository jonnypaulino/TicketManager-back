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
    $set: {
        carrinhoCliente: ingresso._id
    }
})

return res.status(200).json('Ingresso adicionado ao carrinho!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

async function finalizaPagamento(req, res) {

try {

const { tipoPagamentoNumber, numero, titular, cpf, data, boleto, qrCode, copyPaste, ingressoID, userID } = req.body;

const ingresso = await Ingresso.findById(ingressoID)

if(!ingresso){
    return res.status(404).send('Ingresso nao encontrado!');
}

var tipoPagamento;

if(tipoPagamentoNumber == 1){
    tipoPagamento = 'Cartao';
    ingresso.tipoPagamento = tipoPagamento;
    ingresso.cartao.numero = numero;
    ingresso.cartao.titular = titular;
    ingresso.cartao.cpf = cpf;
    ingresso.cartao.data = data;
}
if(tipoPagamentoNumber == 2){
    tipoPagamento = 'Boleto';
    ingresso.tipoPagamento = tipoPagamento;
    ingresso.boleto = boleto;
}
if(tipoPagamentoNumber == 3){
    tipoPagamento = 'PIX';
    ingresso.tipoPagamento = tipoPagamento;
    ingresso.pix.qrCode = qrCode;
    ingresso.pix.copyPaste = copyPaste;
}

ingresso.foiPago = true;

await ingresso.save();

await User.findByIdAndUpdate(userID, {
    $set: {
        carrinhoCliente: ''
    },
    $push: {
        ingressosCliente: ingresso._id
    }
})

return res.status(200).json('Ingresso adicionado ao carrinho!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

module.exports = {

    createIngresso,
    finalizaPagamento,

};