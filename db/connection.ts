import { Sequelize } from "sequelize";

const db = new Sequelize('api-mysql', 'root','$noobmaster123',{
    host:'localhost',
    dialect:'mysql'
});

export default db;