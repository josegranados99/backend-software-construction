import dotenv from "dotenv";
import { Secret } from "jsonwebtoken";
 
dotenv.config();
 
//DATA BASE
export const DB_PORT: number = Number(process.env.DB_PORT);
export const DB_HOST: string = String(process.env.DB_HOST);
export const DB_NAME: string = String(process.env.DB_NAME);
export const DB_USER: string = String(process.env.DB_USER);
export const DB_USER_PASSWORD: string = String(process.env.DB_USER_PASSWORD);

//BACKEND
export const PORT_BACKEND: number = Number(process.env.PORT_BACKEND);
export const SECRET_KEY: Secret = String(process.env.SECRET_KEY);