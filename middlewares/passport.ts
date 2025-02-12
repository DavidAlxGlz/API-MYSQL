import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

import config from "../config/config";
import Usuario from "../models/usuarios";

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

export default new Strategy(opts, async (payload, done)=>{
    try {
        const user = await Usuario.findByPk(payload.idusuarios);
        if(user){
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log(error)
    }
});