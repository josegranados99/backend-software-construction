import cors from "cors";
import morgan from "morgan";
import express from "express";
import userRouteAPI from "../../app/login/route/UserRoute";
import loginRouteAPI from "../../app/login/route/LoginRoute";
import ptRouteAPI from "../../app/product_type/route/ProductTypeRoute";
import productRouteAPI from "../../app/prodcut/route/ProductRoute";
import security from "../../middlewares/Security";
import { PORT_BACKEND } from "../../helpers/constants/config";

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    //Configuration
    this.loadConfig();
    //Route
    this.loadRoute();
  }

  public loadConfig(): void {
    this.app.set("PORT", PORT_BACKEND || 3123);
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "100mb" }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  public loadRoute(): void {
    this.app.use("/v1/api/", loginRouteAPI);
    this.app.use("/v1/api/user", userRouteAPI);

    this.app.use("/v1/api/product-type", security.checkToken, ptRouteAPI);
    this.app.use("/v1/api/product", security.checkToken, productRouteAPI);
  }

  public start(): void {
    this.app.listen(this.app.get("PORT"), () => {
      console.log(`BACKEND UP ON PORT ${this.app.get("PORT")}`);
    });
  }
}

export default Server;