import express from "express";
import passport from "passport";
import { User } from "../entity";
import { createRefreshToken, sendRefreshToken } from "../helper";

export const oauthRoute = express.Router();

oauthRoute.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

oauthRoute.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    sendRefreshToken(res, createRefreshToken(req.user as Partial<User>));
    return res.redirect("/dashboard");
  }
);

oauthRoute.get("/facebook", passport.authenticate("facebook"));

oauthRoute.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
  }),
  (req, res) => {
    sendRefreshToken(res, createRefreshToken(req.user as Partial<User>));
    console.log(req.user);
    return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);
