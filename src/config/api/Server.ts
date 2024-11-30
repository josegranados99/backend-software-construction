import cors from "cors";
import morgan from "morgan";
import express from "express";
import dotenv from "dotenv";
import userRouteAPI from "../../app/login/route/UserRoute";
import loginRouteAPI from "../../app/login/route/LoginRoute";
import ptRouteAPI from "../../app/product_type/route/ProductTypeRoute";
import security from "../../middlewares/Security";

dotenv.config({
  path: ".env",
});

const port = process.env.PORT_BACKEND;

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
    this.app.set("PORT", port || 3123);
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json({ limit: "100mb" }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  public loadRoute(): void {
    this.app.use("/v1/api/", loginRouteAPI);
    this.app.use("/v1/api/user", userRouteAPI);

    this.app.use("/v1/api/product-type", security.checkToken, ptRouteAPI);
  }

  public start(): void {
    this.app.listen(this.app.get("PORT"), () => {
      console.log(`BACKEND UP ON PORT ${this.app.get("PORT")}`);
    });
  }
}

export default Server;
