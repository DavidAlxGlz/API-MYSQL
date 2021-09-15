import { Sequelize } from "sequelize";

const db = new Sequelize('apimysql', 'root','2602754',{
    host:'localhost',
    dialect:'mysql'
});

export default db;