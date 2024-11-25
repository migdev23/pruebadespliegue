const { autenticado } = require("../helper/autenicado");

const estaAutenticado = (req,res,next)=> {
    if(autenticado(req)){
        return next();
    }
    return res.json({msg:'Debes estar autenticado para continuar'});
}


module.exports = {estaAutenticado};