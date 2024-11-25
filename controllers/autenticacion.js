const bcrypt = require('bcrypt');
const login = (req,res) => {
    const {email,password} = req.body;
    req.session.user = email;
    return res.json({msg:'Logeado',redirectTo:"/private"})
    // res.redirect('/private')
}

const register = async(req,res) => {
    let {email,password} = req.body;
    const users = require('../db/db');
    password = await bcrypt.hash(password,10);
    users.push({email,password});
    return res.json({msg:'Registrado'})
}

const logout = (req,res) => {
    req.session.destroy((err)=>{
        if(err){
            return res.json({msg:'No se pudo desloguear'});
        }
        res.clearCookie('connect.sid');
        res.redirect('/')
    });
}

module.exports = {login, register, logout}