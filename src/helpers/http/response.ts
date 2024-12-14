import { Response } from "express";

export const response = (res: Response, statusCode: number, payload: any): Response => {
  return res.status(statusCode).json({
    response: {
      ...payload,
    },
  });
};
