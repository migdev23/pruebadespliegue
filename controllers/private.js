const { autenticado } = require("../helper/autenicado");

const paginaPrivada = (req,res) => {
    return res.render('private/index.ejs',{logged:autenticado(req)});
};

module.exports = {paginaPrivada}