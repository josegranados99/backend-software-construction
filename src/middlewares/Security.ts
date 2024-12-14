import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { SECRET_KEY } from "../helpers/constants/config";

class Security {
  public checkToken(req: Request, res: Response, next: NextFunction): void {
    if (!req.headers.authorization) {
      res.status(401).json({
        response: {
          message: "Unauthorized access",
        },
      });
    } else {
      try {
        const token: string = req.headers.authorization.split(" ")[1] as string;
        const data: string | JwtPayload = jwt.verify(token, SECRET_KEY);

        req.body.data = data;
        next();
      } catch (error) {
        console.log(`Error: ${error}`);
        res.status(401).json({
          response: {
            message: "Failed authorization attempt",
          },
        });
      }
    }
  }
}

const security: Security = new Security();

export default security;
