import { Router } from "express";
import { decode } from "jsonwebtoken";
import passport from "passport";
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
  const userRepository = getConnection("production").getRepository(User);
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

authRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (_req, res) => {
    return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

authRoute.get("/facebook", passport.authenticate("facebook"));

authRoute.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
  }),
  (_req, res) => {
    return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);
