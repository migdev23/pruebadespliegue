const bcrypt = require('bcrypt');
const registroBodyAtributos = (req, res, next) => {
    
    const camposObligatorios = ['email','password','repassword'];
    let error = '';
    
    camposObligatorios.forEach(campoObligatorio => {
        if(!req.body[campoObligatorio] || req.body[campoObligatorio] == null || req.body[campoObligatorio] == undefined || req.body[campoObligatorio].trim() == ""){
            // return res.status(404).json({error:`No existe el campo: ${campoObligatorio}`})
            error += `No existe el campo: ${campoObligatorio} `;
        }

        if(campoObligatorio == 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body[campoObligatorio]) == false){
            // return res.status(404).json({error:'No es un email valido'});
            error += 'No es un email valido ';
        }
    });

    if(error != ''){
        return res.status(404).json({error})
    }

    return next();
}

const loginBodyAtributos = (req, res, next) => {
    
    const camposObligatorios = ['email','password'];
    let error = '';
    
    camposObligatorios.forEach(campoObligatorio => {
        if(!req.body[campoObligatorio] || req.body[campoObligatorio] == null || req.body[campoObligatorio] == undefined || req.body[campoObligatorio].trim() == ""){
            // return res.status(404).json({error:`No existe el campo: ${campoObligatorio}`})
            error += `No existe el campo: ${campoObligatorio} `;
        }

        if(campoObligatorio == 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body[campoObligatorio]) == false){
            // return res.status(404).json({error:'No es un email valido'});
            error += 'No es un email valido ';
        }
    });

    if(error != ''){
        return res.status(404).json({error})
    }

    return next();
}


const passwordDiff = (req,res,next) => {
    if((req.body.password && req.body.repassword) && (req.body.password == req.body.repassword)){
        return next();
    }else{
        return res.status(404).json({error:'Las contraseñas no son iguales'});
    }
}

const duplicadoUsuario = (req, res, next) => {

    if(!req.body.email){
        return res.status(500).json({error:'Falta el campo email'})
    }

    const existeUsuario = require('../db/db.js').find(usuario => usuario.email === req.body.email)
    
    if(existeUsuario){
        return res.status(404).json({error:'El usuario ya existe'})
    }

    return next();
}

const existeUser = (req, res, next) => {
    if(!req.body.email){
        return res.status(404).json({error:'Falta el campo email'})
    }

    const existeUsuario = require('../db/db.js').find(user => user.email === req.body.email)
    
    if(!existeUsuario){
        return res.status(404).json({error:'El usuario no existe existe'})
    }

    return next();
}

const passwordAutenticada = async(req,res,next) => {
    
    if(!req.body.password || !req.body.email){
        return res.status(404).json({error:'Falta el campo email o el campo password'})
    }

    const usuario = require('../db/db.js').find(usuario => usuario.email === req.body.email);

    if(!usuario){
        return res.status(404).json({error:'No existe el usuario con ese email'});
    }

    try {
        const passwordValid = await bcrypt.compare(req.body.password, usuario.password);

        if(!passwordValid){
            return res.status(404).json({error:'Contraseña erronea'});
        }
            
    } catch (error) {
        return res.status(404).json({error:'Hubo un error al verificar la contraseña'});
    }
    
    return next();
}

module.exports = {registroBodyAtributos, passwordDiff, existeUser, loginBodyAtributos, duplicadoUsuario, passwordAutenticada}
