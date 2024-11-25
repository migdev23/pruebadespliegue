const {Router} = require('express');
const { login, register, logout } = require('../controllers/autenticacion');
const { registroBodyAtributos, passwordDiff, duplicadoUsuario, loginBodyAtributos, passwordAutenticada, existeUser } = require('../middleware/autenticacion');
const { estaAutenticado } = require('../middleware/autenticado');
const router = new Router();

router.post('/login',[loginBodyAtributos,existeUser,passwordAutenticada],login);
router.post('/register',[registroBodyAtributos,passwordDiff,duplicadoUsuario],register);
router.get('/logout',[estaAutenticado],logout);

module.exports = router;