import pgPromise from "pg-promise";
import { optionsPG } from "./optionsPG";
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_USER_PASSWORD } from "../../helpers/constantsHelpers";

const pgp = pgPromise(optionsPG);

const pool = pgp({
  user: DB_USER,
  host: DB_HOST,
  password: DB_USER_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
});

pool
  .connect()
  .then((connection)=>{
    console.log(`Connected to the database ${DB_NAME}`);
    connection.done();
  })
  .catch((error) => {
    console.log(`ERROR: ${error}`);
  });

export default pool;
