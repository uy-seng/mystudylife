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
import { DatabaseService } from "./services";
import path from "path";
import { TaskResolver } from "./graphql/resolvers/task/task.resolver";

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
  const PORT = process.env.PORT || 8000;

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("web/build"));
    app.get("*", (_req, res) => {
      return res.sendFile(
        path.resolve(__dirname, "web", "build", "index.html")
      );
    });
  }
  app.listen(PORT, () => {
    console.log(
      `Server running at http://localhost:8000\nGraphql running at http://localhost:8000/graphql`
    );
  });
})();
