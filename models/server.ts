import express, { Application } from "express";
import userRoutes from "../routes/usuario.routes";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import passport from "passport";
import passportMiddleware from "../middlewares/passport";

import db from "../db/connection";

class Server {

    private app: Application;
    private port: number | string;
    private apiPaths= {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;

        this.dbConnection();
        this.middlewares();
        this.routes();
        
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('db online')
            
        } catch (error:any) {
            throw new Error( error );
        }
    }

    middlewares() {
        this.app.use( helmet() )
        this.app.use( morgan('dev') );
        this.app.use( cors() );
        this.app.use( express.urlencoded({ extended:false }));
        this.app.use( express.json() );
        this.app.use( passport.initialize());
        passport.use( passportMiddleware );
        //TODO Carpeta publica
        //this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, userRoutes)
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        })
    }
}

export default Server;