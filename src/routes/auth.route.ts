import { Router } from "express";
import passport from "passport";

export const authRoute = Router();
authRoute.get("/refresh", async (req, res) => {
  // const cookie = req.cookies.jid;
  // const NULL_TOKEN = {
  //   accessToken: "",
  // };
  // if (!cookie) return res.status(200).json(NULL_TOKEN);
  // const userPayload: UserPayload = decode(cookie) as UserPayload;
  // const user = await User.findOne(userPayload.id);
  // if (!user) return res.status(200).json(NULL_TOKEN);
  // if (userPayload.tokenVersion !== user.tokenVersion)
  //   return res.status(200).json(NULL_TOKEN);
  // await getConnection().getRepository(User).increment(
  //   {
  //     id: userPayload.id,
  //   },
  //   "tokenVersion",
  //   1
  // );
  // // synchronous update
  // userPayload.tokenVersion++;
  // res.cookie("jid", createRefreshToken(userPayload));
  // return res.status(200).json({
  //   accessToken: createAccessToken(userPayload),
  // });
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
