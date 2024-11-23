import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { optionsPG } from "./optionsPG";

dotenv.config({
  path: ".env",
});

const host: string = String(process.env.HOST);
const port: number = Number(process.env.PORT);
const db: string = String(process.env.DB);
const dbUser: string = String(process.env.DB_USER);
const dbUserPassword: string = String(process.env.DB_USER_PASSWORD);

const pgp = pgPromise(optionsPG);

const pool = pgp({
  user: dbUser,
  host: host,
  password: dbUserPassword,
  database: db,
  port: port,
});

pool
  .connect()
  .then((connection)=>{
    console.log(`Connected to the database ${db}`);
    connection.done();
  })
  .catch((error) => {
    console.log(`ERROR: ${error}`);
  });

export default pool;
