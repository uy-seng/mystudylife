import { createConnection, getConnection } from "typeorm";
import {
  AcademicYear,
  AcademicYearDayRotationSchedule,
  AcademicYearTerm,
  AcademicYearWeekRotationSchedule,
  Class,
  ClassIncur,
  Exam,
  Subject,
  Task,
  User,
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
      AcademicYearDayRotationSchedule,
      AcademicYearTerm,
      AcademicYearWeekRotationSchedule,
      Class,
      ClassIncur,
      Exam,
      Subject,
      Task,
      User,
    ],
  });
});

afterAll(async () => {
  const defaultConnection = getConnection(process.env.NODE_ENV);
  await defaultConnection.close();
});
