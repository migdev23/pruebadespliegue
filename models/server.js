const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const MongoStore = require('connect-mongo');

class Server {
    constructor() {
        this.app = express();
        this.paths = {
            autenticacion:'/auth',
            public:'',
            private:'/private'
        }

        this.middleware();
        this.routes();
    }

    routes(){
        this.app.use(this.paths.autenticacion, require('../routes/autenticacion'));
        this.app.use(this.paths.private, require('../routes/private'));
        this.app.use(this.paths.public, require('../routes/public'));
    }

    middleware(){

         //Parsear body
         this.app.use(express.json());
         this.app.use(express.urlencoded({ extended: false }));

        //VIEWS
        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine','ejs');

        //COOKIE
        this.app.use(cookieParser());

        //SESIONES
        this.app.use(session({
            secret:process.env.CLAVE_SESSION,
            resave:false,
            saveUninitialized:false,
            // store:MongoStore.create({
            //     mongoUrl:process.env.MONGOURI,
            //     collectionName:'session',
            //     ttl:60*60*24
            // }),
            cookie:{
                maxAge:1000*60*60*24,
                httpOnly:true,
                secure:false
            }
        }))
    }

    listen(){
        this.app.listen(process.env.PORT,()=>{
            console.log(`Servidor funcionando: localhost:${process.env.PORT}`);
        })
    }
}

module.exports = Server;