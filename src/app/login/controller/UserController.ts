import { Request, Response } from "express";
import DaoUserRegister from "../dao/DaoUserRegister";
import User from "../entity/User";
import Access from "../entity/Access";

class UserController extends DaoUserRegister {
  public createUser(req: Request, res: Response): void {
    const userName = req.body.userName;
    const userLastname = req.body.userLastname;
    const accessEmail = req.body.accessEmail;
    const accessPassword = req.body.accessPassword;

    const userObj = new User(0, userName, userLastname);
    const accessObj = new Access(userObj, accessEmail, accessPassword, "")

    UserController.newRegister(accessObj, res);
  }
}

const userController: UserController = new UserController();

export default userController;
