import { Router } from "express";
import productTypeControler from "../controller/ProdcutTypeController";

class ProductTypeRoute {
  public ptRouteAPI: Router;

  constructor() {
    this.ptRouteAPI = Router();
    this.loadRoutes();
  }

  private loadRoutes(): void {
    this.ptRouteAPI.get("/get-all", productTypeControler.getAllPT);
    this.ptRouteAPI.post("/create", productTypeControler.createProductType);
  }
}

// TODO Exportar la propiedad
const ptRoute = new ProductTypeRoute();

export default ptRoute.ptRouteAPI;
