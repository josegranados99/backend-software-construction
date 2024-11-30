import { Request, Response } from "express";
import Product from "../entity/Product";
import DaoProduct from "../dao/DaoProduct";
import ProductType from "../../product_type/entity/ProductType";

class ProductController extends DaoProduct {
  public getAllProduct(req: Request, res: Response): void {
    ProductController.getAllProduct(res);
  }

  public createProduct(req: Request, res: Response): void {
    const productTypeCode = req.body.productTypeCode;
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const productObj = new Product(0, productTypeCode, productName, productPrice);

    ProductController.createProduct(productObj, res);
  }

  public updateProduct(req: Request, res: Response): void {
    const productCode = req.body.productCode;
    const productTypeCode = req.body.productTypeCode;
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const productObj = new Product(productCode, productTypeCode, productName, productPrice);
    ProductController.updateProduct(productObj, res);
  }

  public deleteProduct(req: Request, res: Response): void {
    if (isNaN(Number(req.params.productId))) {
      ProductController.checkParams(res);
    } else {
      const productId = Number(req.params.productId);
      const productObj = new Product(productId, new ProductType(0, ""), "", 0);
      ProductController.deleteProduct(productObj, res);
    }
  }
}

const productController: ProductController = new ProductController();

export default productController;
