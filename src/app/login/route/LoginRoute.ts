import { Router } from "express";
import loginController from "../controller/LoginController";

class LoginRoute {
  public loginRouteAPI:Router;

  constructor(){
    this.loginRouteAPI = Router();
    this.loadRouteLogin();
  }

  private loadRouteLogin(): void {
    this.loginRouteAPI.post("/login", loginController.login);
  }
}

const loginRoute = new LoginRoute();

export default loginRoute.loginRouteAPI;

