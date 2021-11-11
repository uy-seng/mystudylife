import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { apiRoute } from "./routes";
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
} from "./graphql/resolvers";
import { DatabaseService, PassportService } from "./services";
import { TaskResolver } from "src/graphql/resolvers/task/task.resolver";
import { oauthRoute } from "./routes/oauth.route";

(async () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: [
        "https://studio.apollographql.com",
        "http://localhost:3000",
        "http://localhost:3001",
      ],
    })
  );
  const databaseService = new DatabaseService();
  await databaseService.init();
  const passportService = new PassportService(app);
  passportService.initGoogleOAuthStrategy();
  passportService.initFacebookOAuthStrategy();
  app.get("/", (_req, res) => {
    res.redirect("/graphql");
  });
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
      ],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(8000, () => {
    console.log(
      `Server running at http://localhost:8000\nGraphql running at http://localhost:8000/graphql`
    );
  });
})();
