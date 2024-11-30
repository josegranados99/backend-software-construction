import { Response, Request } from "express";
import ProductType from "../entity/ProductType";
import DaoProductType from "../dao/DaoProductType";

class ProductTypeController extends DaoProductType {
  public getAllPT(req: Request, res: Response): void {
    ProductTypeController.getAllPT(res);
  }

  public createProductType(req: Request, res: Response): void {
    if (typeof req.body.productTypeName !== "undefined") {
      const productTObj = new ProductType(0, req.body.productTypeName);
      ProductTypeController.newProductType(productTObj, res);
    } else {
      ProductTypeController.checkParams(res);
    }
  }
}

const productTypeControler = new ProductTypeController();

export default productTypeControler;
