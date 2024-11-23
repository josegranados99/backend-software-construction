import { Request, Response } from "express";
import DaoUserRegister from "../dao/DaoUserRegister";

class UserController extends DaoUserRegister {
  public createUser(req: Request, res: Response): void {
    const accessObject = req.body;
    UserController.newRegister(accessObject, res);
  }
}

const userController: UserController = new UserController();

export default userController;
