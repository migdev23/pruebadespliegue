const { autenticado } = require("../helper/autenicado");

const paginaInicio = (req,res) => {
    return res.render('public/index.ejs',{logged:autenticado(req)});
}

module.exports = {paginaInicio}