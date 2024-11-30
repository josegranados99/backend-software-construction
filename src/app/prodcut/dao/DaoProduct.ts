import { Response } from "express";
import Product from "../entity/Product";
import { SQL_Product } from "../repository/sql_product";
import pool from "../../../config/connection/dbConnection";

class DaoProduct {
  protected static async getAllProduct(res: Response): Promise<any> {
    await pool
      .result(SQL_Product.GET_PRODUCT, [])
      .then((products: any) => {
        res.status(200).json({
          response: {
            menubar: "Products found",
            data: products.rows,
          },
        });
      })
      .catch((error) => {
        console.log(`Error ${error}`);
        res.status(400).json({
          response: {
            message: "Error searching for products",
          },
        });
      });
  }

  protected static async createProduct(productObj: Product, res: Response): Promise<any> {
    pool
      .task(async (myQuery) => {
        console.log(productObj);
        
        const newProduct: any = await myQuery.one(SQL_Product.CREATE_PRODUCT, [
          productObj.productTypeCode.productTypeCode,
          productObj.productName,
          productObj.productPrice,
        ]);

        

        return newProduct;
      })
      .then((newProduct) => {
        res.status(200).json({
          response: {
            message: "Product created",
            data: newProduct,
          },
        });
      })
      .catch((error) => {
        console.log(`Error. ${error}`);
        res.status(400).json({
          response: {
            message: "Error creating product",
          },
        });
      });
  }

  protected static async updateProduct(productObj: Product, res: Response): Promise<void> {
    await pool
      .result(SQL_Product.UPDATE_PRODUCT, [
        productObj.productTypeCode.productTypeCode,
        productObj.productName,
        productObj.productPrice,
        productObj.productCode,
      ])
      .then((updateProduct: any) => {
        res.status(200).json({
          response: {
            message: "Updated product",
            data: updateProduct.rowCount,
          },
        });
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
        res.status(400).json({
          response: {
            message: "Error updating product",
          },
        });
      });

  }

  protected static async deleteProduct(productObj: Product, res: Response): Promise<void> {
    await pool
      .result(SQL_Product.DELETE_PRODUCT, productObj.productCode)
      .then((deleteProduct: any) => {
        res.status(200).json({
          response: {
            message: "Product removed",
            data: deleteProduct.rowCount,
          },
        });
      })
      .catch((error) => {
        console.log(`Error ${error}`);
        res.status(400).json({
          response: {
            message: "Error deleting product",
          },
        });
      });
  }

  protected static async checkParams(res: Response): Promise<any> {
    res.status(400).json({
      response: {
        message: "Error in parameters",
      },
    });
  }
}

export default DaoProduct;
