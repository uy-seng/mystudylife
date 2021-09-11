import { Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "src/entity";

export const createAccessToken = (user: Partial<User>) => {
  return sign({ user: user }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
};

export const createRefreshToken = (user: Partial<User>) => {
  return sign({ user: user }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};

export const sendRefreshToken = (res: Response, cookie: string) => {
  res.cookie("jid", cookie, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
  });
};
