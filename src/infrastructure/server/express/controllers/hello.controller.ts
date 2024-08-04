import { Request, Response } from "express";

export const helloController = (_req: Request, res: Response) => {
  res.status(200).json({ message: "hello world!!!" });
};
