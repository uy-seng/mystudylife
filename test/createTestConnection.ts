import { createConnection, getConnection } from "typeorm";
import {
  AcademicYear,
  AcademicYearSchedule,
  WeekRotationSchedule,
  DayRotationSchedule,
  Term,
  Class,
  ClassSchedule,
  OneOffSchedule,
  RepeatSchedule,
  Exam,
  Subject,
  Task,
  User,
  UserProvider,
} from "../src/entity";

beforeAll(async () => {
  await createConnection({
    name: "test",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "ashura",
    password: "Nova_44056",
    database: "mystudylife_test",
    synchronize: true,
    logging: false,
    dropSchema: true,
    entities: [
      AcademicYear,
      AcademicYearSchedule,
      WeekRotationSchedule,
      DayRotationSchedule,
      Term,
      Class,
      ClassSchedule,
      OneOffSchedule,
      RepeatSchedule,
      Exam,
      Subject,
      Task,
      User,
      UserProvider,
    ],
  });
});

afterAll(async () => {
  const defaultConnection = getConnection(process.env.NODE_ENV);
  await defaultConnection.close();
});
