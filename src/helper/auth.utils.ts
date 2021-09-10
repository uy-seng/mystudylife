import { Response } from "express";
import { sign } from "jsonwebtoken";
import { UserPayload } from "src/graphql/resolvers/auth/types";

export const createAccessToken = (user: UserPayload) => {
  return sign({ user: user }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
};

export const createRefreshToken = (user: UserPayload) => {
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
