const {Router} = require('express');
const { paginaInicio } = require('../controllers/public');
const { estaAutenticado } = require('../middleware/autenticado');
const { autenticado } = require('../helper/autenicado');
const router = new Router();

router.get('/', paginaInicio)

router.get('/profile', [estaAutenticado], (req,res)=>{
    res.render('private/profile',{logged:autenticado(req),profile:req.session.user});
});

module.exports = router;