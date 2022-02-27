import { Router } from "express";
import { decode } from "jsonwebtoken";
import { User } from "../entity";
import {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} from "../helper";
import { getConnection } from "typeorm";

export const authRoute = Router();
authRoute.get("/refresh-token", async (req, res) => {
  const cookie = req.cookies.jid;
  const userRepository = getConnection(process.env.NODE_ENV).getRepository(
    User
  );
  const NULL_TOKEN = {
    accessToken: "",
  };
  if (!cookie) return res.status(200).json(NULL_TOKEN);
  const userPayload = decode(cookie) as any;
  const user = await userRepository.findOne(userPayload.user.id);
  if (!user) return res.status(200).json(NULL_TOKEN);
  if (userPayload.user.tokenVersion !== user.tokenVersion)
    return res.status(200).json(NULL_TOKEN);
  await userRepository.increment(
    {
      id: userPayload.user.id,
    },
    "tokenVersion",
    1
  );
  // synchronous update
  userPayload.user.tokenVersion++;
  sendRefreshToken(res, createRefreshToken(userPayload.user));
  return res.status(200).json({
    accessToken: createAccessToken(userPayload.user),
  });
});
