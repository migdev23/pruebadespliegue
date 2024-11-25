const {Router} = require('express');
const { paginaPrivada } = require('../controllers/private');
const { estaAutenticado } = require('../middleware/autenticado');
const router = new Router();

router.get('/', [estaAutenticado], paginaPrivada)


module.exports = router;