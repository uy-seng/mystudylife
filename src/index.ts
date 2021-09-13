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
} from "./graphql/resolvers";
import { DatabaseService } from "./services";

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
  app.get("/", (_req, res) => {
    res.redirect("/graphql");
  });
  app.use("/api", apiRoute);
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        AuthResolver,
        AcademicYearResolver,
        AcademicYearScheduleResolver,
        TermResolver,
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
