import { DataTypes } from "sequelize";
import db from "../db/connection";
import bcrypt from "bcrypt";

const Usuario = db.define('Usuario',{
    idusuarios: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        defaultValue: true
    },
    account: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    nombre:{
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    }
});

Usuario.beforeCreate( async function(user:any) {
    const salt = await bcrypt.genSalt(10); //whatever number you want
    user.password = await bcrypt.hash(user.password, salt);
})

Usuario.prototype.validPassword = async function(password:string) {
    return await bcrypt.compare(password, this.password);
}

export default Usuario;