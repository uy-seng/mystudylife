import { getConnection } from "typeorm";
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
import { expect } from "chai";

describe("setting up test environment", () => {
  it("should be test environment", () => {
    expect(process.env.NODE_ENV).to.equal("test");
  });

  it("should connect to (name: test) typeorm connection", () => {
    expect(getConnection("test")).to.exist;
  });

  it("should have User repository", async () => {
    const repository = await getConnection("test").getRepository(User);
    expect(repository).to.exist;
  });

  it("should have AcademicYear repository", async () => {
    const repository = await getConnection("test").getRepository(AcademicYear);
    expect(repository).to.exist;
  });

  it("should have AcademicYearDayRotationSchedule repository", async () => {
    const repository = await getConnection("test").getRepository(
      AcademicYearDayRotationSchedule
    );
    expect(repository).to.exist;
  });

  it("should have AcademicYearTerm repository", async () => {
    const repository = await getConnection("test").getRepository(
      AcademicYearTerm
    );
    expect(repository).to.exist;
  });

  it("should have AcademicYearWeekRotationSchedule repository", async () => {
    const repository = await getConnection("test").getRepository(
      AcademicYearWeekRotationSchedule
    );
    expect(repository).to.exist;
  });

  it("should have Class repository", async () => {
    const repository = await getConnection("test").getRepository(Class);
    expect(repository).to.exist;
  });

  it("should have ClassIncur repository", async () => {
    const repository = await getConnection("test").getRepository(ClassIncur);
    expect(repository).to.exist;
  });

  it("should have Exam repository", async () => {
    const repository = await getConnection("test").getRepository(Exam);
    expect(repository).to.exist;
  });

  it("should have Subject repository", async () => {
    const repository = await getConnection("test").getRepository(Subject);
    expect(repository).to.exist;
  });

  it("should have Task repository", async () => {
    const repository = await getConnection("test").getRepository(Task);
    expect(repository).to.exist;
  });
});
