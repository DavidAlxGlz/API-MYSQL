import dotenv from "dotenv";
import Server from "./models/server";

//Variables de entorno
dotenv.config();


const server = new Server();

server.listen();