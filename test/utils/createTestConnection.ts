import { createConnection } from "typeorm";

export const createTestConnection = () =>
  createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "ashura",
    password: "Nova_44056",
    database: "mystudylife_test",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  });
