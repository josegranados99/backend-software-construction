import { Response, Request } from "express";
import DaoLogin from "../dao/DaoLogin";
import Access from "../entity/Access";

class LoginController extends DaoLogin {
  public login(req: Request, res: Response): void {
    const accessObject: Access = req.body;
    LoginController.newLogin(accessObject, res);
  }
}

const loginController = new LoginController();

export default loginController;
