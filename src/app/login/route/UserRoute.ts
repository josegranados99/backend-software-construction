import { Router } from "express";
import userController from "../controller/UserController";

class UserRoute {
  public userRouteAPI: Router;

  constructor(){
    this.userRouteAPI = Router();
    this.loadRoutes();
  };

  private loadRoutes(): void {
    this.userRouteAPI.post("/create", userController.createUser)
  }
}

const userRoute = new UserRoute();

export default userRoute.userRouteAPI;