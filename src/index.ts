import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { apiRoute } from "./routes";
import { oauthRoute } from "./routes/oauth.route";
import {
  AuthResolver,
  AcademicYearResolver,
  AcademicYearScheduleResolver,
  TermResolver,
  SubjectResolver,
  ClassResolver,
  ClassScheduleResolver,
  OneOffScheduleResolver,
  RepeatScheduleResolver,
  TaskResolver,
  HolidayResolver,
} from "./graphql/resolvers";
import { DatabaseService, PassportService } from "./services";
import path from "path";

(async () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.enable("trust proxy");
  app.use(
    cors({
      credentials: true,
      origin: [
        "https://mystudylife-clone.onrender.com",
        "http://mystudylife-clone-useng.herokuapp.com",
      ],
    })
  );
  const databaseService = new DatabaseService();
  await databaseService.init();
  const passportService = new PassportService(app);
  passportService.initGoogleOAuthStrategy();
  passportService.initFacebookOAuthStrategy();
  app.use("/oauth", oauthRoute);
  app.use("/api", apiRoute);
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AuthResolver,
        AcademicYearResolver,
        AcademicYearScheduleResolver,
        TermResolver,
        SubjectResolver,
        ClassResolver,
        ClassScheduleResolver,
        OneOffScheduleResolver,
        RepeatScheduleResolver,
        TaskResolver,
        HolidayResolver,
      ],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });
  const PORT = process.env.PORT || 8000;

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("web/build"));
    app.get("*", (_req, res) => {
      return res.sendFile(path.resolve("web", "build", "index.html"));
    });
  }
  app.listen(PORT, () => {
    console.log("Client running at https://mystudylife-clone.onrender.com/");
  });
})();
