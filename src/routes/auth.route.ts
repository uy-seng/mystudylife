import { Router } from "express";
import { decode } from "jsonwebtoken";
import { getConnection } from "typeorm";
import { UserPayload } from "../interface/auth.d";
import { createAccessToken, createRefreshToken } from "../helper/auth.utils";
import { User } from "../entity/User";

export const authRoute = Router();
authRoute.get("/refresh", async (req, res) => {
  const cookie = req.cookies.jid;
  const NULL_TOKEN = {
    accessToken: "",
  };
  if (!cookie) return res.status(200).json(NULL_TOKEN);
  const userPayload: UserPayload = decode(cookie) as UserPayload;
  const user = await User.findOne(userPayload.id);
  if (!user) return res.status(200).json(NULL_TOKEN);
  if (userPayload.tokenVersion !== user.tokenVersion)
    return res.status(200).json(NULL_TOKEN);
  await getConnection().getRepository(User).increment(
    {
      id: userPayload.id,
    },
    "tokenVersion",
    1
  );
  // synchronous update
  userPayload.tokenVersion++;
  res.cookie("jid", createRefreshToken(userPayload));
  return res.status(200).json({
    accessToken: createAccessToken(userPayload),
  });
});
