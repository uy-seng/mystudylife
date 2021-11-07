import { Request, Response } from "express";
import { User } from "../entity";

export interface Context {
  req: Request;
  res: Response;
  user?: Partial<User>;
}
