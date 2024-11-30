import { Router } from "express";
import productController from "../controller/ProductController";

class ProcutRoute {
  public productRouteAPI: Router;

  constructor() {
    this.productRouteAPI = Router();
    this.loadRoutes();
  }

  private loadRoutes() : void {
    this.productRouteAPI.get("/get-all", productController.getAllProduct);
    this.productRouteAPI.post("/create", productController.createProduct);
    this.productRouteAPI.put("/update", productController.updateProduct);
    this.productRouteAPI.delete("/delete/:productId", productController.deleteProduct);
  }
}

const productRoute = new ProcutRoute();

export default productRoute.productRouteAPI; 