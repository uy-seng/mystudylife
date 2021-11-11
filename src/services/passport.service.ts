import { PassportStatic } from "passport";
import express from "express";
import passport from "passport";
import { getConnection } from "typeorm";
import { User, UserProvider } from "src/entity";
import GoogleOAuth from "passport-google-oauth20";
import FacebookOAuth from "passport-facebook";
import { v4 } from "uuid";
export class PassportService {
  passport: PassportStatic;
  app: express.Express;
  constructor(app: express.Express) {
    this.passport = passport;
    this.app = app;
    this.app.use(this.passport.initialize());
    this.passport.serializeUser((user: any, done) => {
      done(null, user.id);
    });
    this.passport.deserializeUser(async (id: any, done) => {
      const user = await getConnection(process.env.NODE_ENV)
        .getRepository(User)
        .findOne(id);
      done(null, user);
    });
  }

  initGoogleOAuthStrategy() {
    this.passport.use(
      new GoogleOAuth.Strategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          callbackURL: "/oauth/google/callback",
        },
        async (
          accessToken: string,
          refreshToken: string,
          profile: GoogleOAuth.Profile,
          done: GoogleOAuth.VerifyCallback
        ) => {
          const user = await await getConnection(process.env.NODE_ENV)
            .getRepository(User)
            .findOne({
              relations: ["provider"],
              where: {
                email: profile.emails![0].value,
              },
            });
          if (user) {
            if (!user.provider.id) {
              user.provider.id = profile.id;
              user.provider.name = "google";
              await await getConnection(process.env.NODE_ENV)
                .getRepository(User)
                .save(user);
            }
            done(null, user);
          } else {
            const newUserProvider = await getConnection(process.env.NODE_ENV)
              .getRepository(UserProvider)
              .create({
                id: profile.id,
                name: "google",
              });
            await getConnection(process.env.NODE_ENV)
              .getRepository(UserProvider)
              .save(newUserProvider);

            const newUser: User = await getConnection(process.env.NODE_ENV)
              .getRepository(User)
              .create({
                email: profile.emails![0].value,
                username: profile.displayName.concat(v4().split("-")[0]),
                userProviderId: profile.id,
              });

            await getConnection(process.env.NODE_ENV)
              .getRepository(User)
              .save(newUser);

            done(null, newUser);
          }
        }
      )
    );
  }

  initFacebookOAuthStrategy() {
    this.passport.use(
      new FacebookOAuth.Strategy(
        {
          clientID: process.env.FACEBOOK_CLIENT_ID!,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
          callbackURL: "http://localhost:8000/oauth/facebook/callback",
        },
        async (
          _accessToken: string,
          _refreshToken: string,
          profile: FacebookOAuth.Profile,
          done
        ) => {
          const user = await getConnection(process.env.NODE_ENV)
            .getRepository(User)
            .findOne({
              relations: ["provider"],
              where: {
                provider: {
                  id: profile.id,
                },
              },
            });
          if (user) {
            done(null, user);
          } else {
            const newUserProvider = await getConnection(process.env.NODE_ENV)
              .getRepository(UserProvider)
              .create({
                id: profile.id,
                name: "facebook",
              });
            await getConnection(process.env.NODE_ENV)
              .getRepository(UserProvider)
              .save(newUserProvider);

            const newUser: User = await getConnection(process.env.NODE_ENV)
              .getRepository(User)
              .create({
                username: profile.displayName.concat(v4().split("-")[0]),
                userProviderId: profile.id,
              });

            await await getConnection(process.env.NODE_ENV)
              .getRepository(User)
              .save(newUser);

            done(null, newUser);
          }
        }
      )
    );
  }
}
