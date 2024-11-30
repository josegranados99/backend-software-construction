import { query, Response } from "express";
import encode from "bcryptjs";
import jwt, {Secret} from "jsonwebtoken";
import Token from "../entity/Token";
import Access from "../entity/Access";
import { SQL_Access } from "../repository/sql_access";
import pool from "../../../config/connection/dbConnection";
import { SQL_User } from "../repository/sql_register";
import { SECRET_KEY } from "../../../helpers/constantsHelpers";



class DaoLogin {
  protected static async newLogin(accessObject: Access, res: Response): Promise<any> {
    await pool
      .task(async (query) => {
        let action: number = 1;
        let token: Token = new Token();
        let testObject;
        let passwordCorrect: boolean = false;

        let info: any = await query.result(SQL_Access.DATA_TOKEN, accessObject.accessEmail);

        if (info.rows.length != 0) {
          testObject = info.rows.shift();
          passwordCorrect = encode.compareSync(accessObject.accessPassword, testObject.accessPassword);

          if (passwordCorrect) {
            action = 2;

            await query.none(SQL_Access.UPDATE_UUID, testObject.userCode);

            info = await query.result(SQL_Access.DATA_TOKEN, accessObject.accessEmail);

            testObject = info.rows.shift();
            delete testObject.accessPassword;
            token = testObject as Token;

            await query.none(SQL_Access.ENTRY_REGISTER, token.userCode);
          }
        }

        return { action, token };
      })
      .then(({ action, token }) => {
        switch (action) {
          case 1:
            res.status(403).json({
              response: "Incorrect email or password",
            });
            break;
          case 2:
            const createToken = jwt.sign(token, SECRET_KEY, { expiresIn: "8h" });
            res.status(200).json(createToken);
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.log(`Error login: ${error}`);
        res.status(400).json({
          response: "Error auth user",
        });
      });
  }
}

export default DaoLogin;
