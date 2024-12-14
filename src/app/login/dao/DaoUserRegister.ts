import encode from "bcryptjs";
import jwt, {Secret} from "jsonwebtoken";
import { Response } from "express";
import Access from "../entity/Access";
import Token from "../entity/Token";
import pool from "../../../config/connection/dbConnection";
import { SQL_User } from "../repository/sql_register";
import { SQL_Access } from "../repository/sql_access";
import { SECRET_KEY } from "../../../helpers/constants/config";
class DaoUserRegister {
  protected static async newRegister(accessObjct: Access, res: Response): Promise<any> {
    await pool
      .task(async (query) => {
        let action: number = 1;
        let token: Token = new Token();

        const amountEmail = await query.one(SQL_User.AMOUNT_EMAIL, accessObjct.accessEmail);
        
        if (amountEmail.found == 0) {
          action = 2;
          const encodePassword: string = encode.hashSync(accessObjct.accessPassword as string);
          const userCreate = await query.one(SQL_User.USER_CREATE, [accessObjct.userCode.userName, accessObjct.userCode.userLastname]);
          const newUserCode = userCreate.userCode;

          await query.none(SQL_User.ACCESS_CREATE, [newUserCode, accessObjct.accessEmail, encodePassword]);
          await query.none(SQL_Access.ENTRY_REGISTER, newUserCode);

          const infoToken: any = await query.result(SQL_Access.DATA_TOKEN, accessObjct.accessEmail);
          const infoTokenJson = infoToken.rows.shift();
          
          delete infoTokenJson.accessPassword;
          token = infoTokenJson;
        }

        return { action, token };
      })
      .then(({action, token}) => {
        switch (action) {
          case 1:
            res.status(400).json({
              "response": "Email already exists"
            });            
            break;
          case 2:
            const createToken = jwt.sign(token, SECRET_KEY, {expiresIn: "8h"});
            res.status(200).json(createToken);
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.log(`ERROR: ${error}`);
        res.status(400).json({
          response: "Error creating user",
        });
      });
  }
}

export default DaoUserRegister;
