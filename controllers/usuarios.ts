import { Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import  config  from "../config/config";

import Usuario from "../models/usuarios";

function createToken(usuario:any){
    return jwt.sign({id:usuario.idusuarios},config.jwtSecret,{
        expiresIn: 8000
    })
}

export const singin = async (req:Request, res:Response):Promise<Response> => {
    console.log('si entra')
    if(!req.body.account || !req.body.password){
        return res.status(401).json({msg:'Envie la informacion'})
    }
    const { body } = req;
    try {

        const auth = Usuario.findOne({ where: { account: body.account } }).then(async function (user:any) {
            if (!user) {
                //TODO usuario no encontrado
                return res.status(400).json({ msg: 'Usuario no existe!' });
            } else if (!await user.validPassword(body.password)) {
                //TODO Error password
                return res.status(400).json({ msg: 'Error de contraseña' });
            } else {
                //TODO success
                return res.status(200).json({ token: createToken(user) })
            }
        });

        return auth;
        
    } catch (error) {
        return res.status(500).json({msg:'Error del servidor'})
    }
}

export const postUsuarios = async (req:Request, res:Response):Promise<Response> => {
    if(!req.body.account || !req.body.password){
        return res.status(401).json({msg:'Envie la informacion'})
    }
    const  { body } = req;

   try {
    const existAccount = await Usuario.findOne({
        where: {
            account: body.account

        }
    });

    if(existAccount){
        return res.status(400).json({
            msg: 'El usuario ya existe'
        })
    }

    const usuario = new (Usuario as any)(body);
    await usuario.save();

    return res.status(200).json({ usuario:usuario });

   } catch (error) {
       console.log(error)
       return res.status(500).json({
           msg:'Error en al crear usuario'
       });
   }
}