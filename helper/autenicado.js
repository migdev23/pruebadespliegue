const autenticado = (req) => {
    if(req.session.user){
        return true
    }else{
        return false
    }
}
module.exports = {autenticado}