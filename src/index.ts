import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import cors from "cors";

import { AuthResolver, UserResolver } from "./graphql/resolvers";
import { apiRoute } from "./routes";

(async () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    })
  );
  createConnection().then(() => {
    console.log("Database started");
  });

  app.use("/api", apiRoute);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, UserResolver],
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
