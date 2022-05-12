const Categoria = require('../Model/index')
const Admin = require('../../User/Model/admin')

async function createCategoria(req, res) {

try {

const { name, adminID } = req.body;

const admin = await Admin.findById(adminID)

if(!admin){
    return res
        .status(404)
        .json({ message: 'Nao foi encontrado admin com esse ID!' });
}

const categoria = await Categoria.findOne({name: name})

if(!categoria){
    await Categoria.create({
        name: name,
        lastMod: Date.now
    })
}else{
    return res
        .status(409)
        .json({ message: 'Categoria com esse nome ja existe!' });
}

return res.status(200).json('Categoria criada!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

async function updateCategoria(req, res) {

try {

const { name, adminID, categoriaID } = req.body;

const admin = await Admin.findById(adminID)

if(!admin){
    return res
        .status(404)
        .json({ message: 'Nao foi encontrado admin com esse ID!' });
}

const categoria = await Categoria.findByIdAndUpdate(categoriaID,{
    $set:{
        name: name,
        lastMod: Date.now
    }
})

return res.status(200).json('Categoria atualizada!');

} catch ({ message }) {
return res.status(500).json({ message });
}
}

async function deleteCategoria(req, res) {

    try {
    
    const { adminID, categoriaID } = req.body;
    
    const admin = await Admin.findById(adminID)
    
    if(!admin){
        return res
            .status(404)
            .json({ message: 'Nao foi encontrado admin com esse ID!' });
    }
    
    await Categoria.findByIdAndDelete(categoriaID)
    
    return res.status(200).json('Categoria deletada!');
    
    } catch ({ message }) {
    return res.status(500).json({ message });
    }
    }

module.exports = {

    createCategoria,
    updateCategoria,
    deleteCategoria,

};