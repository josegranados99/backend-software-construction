import { response, Response } from "express";
import ProductType from "../entity/ProductType";
import { SQL_product_type } from "../repository/SQL_product_type";
import pool from "../../../config/connection/dbConnection";

class DaoProductType {
  protected static async newProductType(productObj: ProductType, res: Response): Promise<any> {
    await pool
      .task(async (myQuery) => {
        const newPT: any = await myQuery.result(SQL_product_type.AMOUNT_PRODUCT_TYPE, productObj.productTypeName);

        if (newPT.rows[0].found == 0) {
          return await myQuery.result(SQL_product_type.PRODUCT_TYPE_CREATE, productObj.productTypeName);
        }

        return newPT;
      })
      .then((myResult) => {
        if (myResult.command == "SELECT") {
          res.status(400).json({
            response: "Product type already exists",
          });
        } else {
          res.status(200).json({
            response: "Type of product created",
            payload: myResult.rows[0].product_type_code,
          });
        }
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
        res.status(400).json({
          response: "Error creating product type",
        });
      });
  }

  protected static async getAllPT(res: Response): Promise<any> {
    await pool
      .result(SQL_product_type.GET_ALL_PRODUCT_TYPE)
      .then((myResult: any) => {
        res.status(200).json(myResult.rows);
      })
      .catch((error) => {
        res.status(400).json({
          response: "Error finding product types",
        });
        console.log(`Error: ${error}`);
      });
  }

  protected static async checkParams(res: Response): Promise<any> {
    res.status(400).json({
      response: "Error in parameters",
    });
  }
}

export default DaoProductType;
