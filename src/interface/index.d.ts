import { Request, Response } from "express";
import { UserPayload } from "./auth";

export interface Context {
  req: Request;
  res: Response;
  user?: UserPayload;
}
