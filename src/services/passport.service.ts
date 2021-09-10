export class PassportService {
  // passport: PassportStatic;
  // app: Express;
  // constructor(app: Express) {
  //   this.passport = passport;
  //   this.app = app;
  //   this.app.use(this.passport.initialize());
  //   this.passport.serializeUser((user: any, done) => {
  //     done(null, user.id);
  //   });
  //   this.passport.deserializeUser(async (id: any, done) => {
  //     const user = await User.findOne(id);
  //     done(null, user);
  //   });
  // }
  // initGoogleOAuthStrategy() {
  //   this.passport.use(
  //     new GoogleOAuth.Strategy(
  //       {
  //         clientID: process.env.GOOGLE_CLIENT_ID!,
  //         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //         callbackURL: "/api/auth/google/callback",
  //       },
  //       async (
  //         _accessToken: string,
  //         _refreshToken: string,
  //         profile: GoogleOAuth.Profile,
  //         done: GoogleOAuth.VerifyCallback
  //       ) => {
  //         const user = await User.findOne({
  //           where: {
  //             email: profile.emails![0].value,
  //           },
  //         });
  //         if (user) {
  //           if (!user.providerId) {
  //             user.providerId = profile.id;
  //             user.provider = "google";
  //             await user.save();
  //           }
  //           done(null, user);
  //         } else {
  //           const newUser: User = User.create({
  //             email: profile.emails![0].value,
  //             username: profile.displayName.concat(uuidv4().split("-")[0]),
  //             provider: "google",
  //             providerId: profile.id,
  //           });
  //           await newUser.save();
  //           done(null, newUser);
  //         }
  //       }
  //     )
  //   );
  // }
  // initFacebookOAuthStrategy() {
  //   this.passport.use(
  //     new FacebookOAuth.Strategy(
  //       {
  //         clientID: process.env.FACEBOOK_CLIENT_ID!,
  //         clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  //         callbackURL: "http://localhost:8000/api/auth/facebook/callback",
  //       },
  //       async (
  //         _accessToken: string,
  //         _refreshToken: string,
  //         profile: FacebookOAuth.Profile,
  //         done
  //       ) => {
  //         const user = await User.findOne({
  //           where: {
  //             providerId: profile.id,
  //           },
  //         });
  //         if (user) {
  //           done(null, user);
  //         } else {
  //           const newUser: User = User.create({
  //             username: profile.displayName.concat(uuidv4().split("-")[0]),
  //             providerId: profile.id,
  //             provider: "facebook",
  //           });
  //           await newUser.save();
  //           done(null, user);
  //         }
  //       }
  //     )
  //   );
  // }
}
