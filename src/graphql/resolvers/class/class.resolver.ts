import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { AcademicYear, Class, Subject, Term, User } from "src/entity";
import { ClassArgs, UpdateClassArgs } from "./types";
import { getConnection } from "typeorm";
import { ValidationError, ApolloError } from "apollo-server-errors";
import { authenticationGate } from "src/middleware";
import { Context } from "src/interface";

@Resolver()
export class ClassResolver {
  private readonly classRespository = getConnection(
    process.env.NODE_ENV
  ).getRepository(Class);
  private readonly subjectRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(Subject);
  private readonly userRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(User);
  private readonly academicYearRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(AcademicYear);
  private readonly termRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(Term);

  @Mutation(() => Class)
  @UseMiddleware(authenticationGate)
  async newClass(
    @Args()
    {
      subjectId,
      building,
      module,
      room,
      teacher,
      academicYearId,
      termId
    }: ClassArgs,
    @Ctx() { user }: Context
  ) {
    const newClass = this.classRespository.create({
      building: building,
      module: module,
      room: room,
      teacher: teacher
    });

    const subject = await this.subjectRepository.findOne(subjectId);
    if (!subject) throw new ValidationError("invalid subject id");
    newClass.subject = subject;

    if (academicYearId) {
      const academicYear = await this.academicYearRepository.findOne(
        academicYearId
      );
      if (!academicYear) throw new ValidationError("invalid academic year id");
      newClass.academicYear = academicYear;
    }

    if (termId) {
      const term = await this.termRepository.findOne(termId);
      if (!term) throw new ValidationError("invalid term id");
      newClass.term = term;
    }

    const qUser = (await this.userRepository.findOne(user!.id)) as User;
    newClass.user = qUser;

    return await this.classRespository.save(newClass);
  }

  @Query(() => [Class])
  @UseMiddleware(authenticationGate)
  async getClasses(@Ctx() { user }: Context) {
    const classes = await this.classRespository.find({
      relations: [
        "schedule",
        "schedule.oneOff",
        "schedule.repeat",
        "user",
        "subject",
        "academicYear",
        "academicYear.schedule",
        "academicYear.schedule.dayRotation",
        "academicYear.schedule.weekRotation",
        "term"
      ],
      where: {
        user: {
          id: user!.id
        }
      }
    });
    return classes;
  }

  @Query(() => Class)
  @UseMiddleware(authenticationGate)
  async getClassById(
    @Arg("id", () => String) id: string,
    @Ctx() { user }: Context
  ) {
    const q = await this.classRespository.findOne(id, {
      relations: [
        "schedule",
        "schedule.oneOff",
        "schedule.repeat",
        "academicYear",
        "user",
        "subject",
        "term"
      ]
    });
    if (!q || q.user.id !== user!.id) throw new ApolloError("result not found");
    return q;
  }

  @Query(() => [Class])
  @UseMiddleware(authenticationGate)
  async getClassesByDate(
    @Arg("date", () => Date) date: Date,
    @Ctx() { user }: Context
  ) {
    const classes = await this.classRespository.find({
      relations: [
        "schedule",
        "schedule.oneOff",
        "schedule.repeat",
        "user",
        "academicYear",
        "term"
      ],
      where: {
        user: {
          id: user!.id
        }
      }
    });
    return classes.filter((c) => {
      // if class schedule is oneOff, check date
      if (c.schedule.type === "oneOff") {
        // check if date is between academic year
        if (c.academicYear)
          return (
            +new Date(c.schedule.oneOff.date) === +date &&
            +date >= +new Date(c.academicYear.startDate) &&
            +date <= +new Date(c.academicYear.endDate)
          );
        return +new Date(c.schedule.oneOff.date) === +date;
      }
      // if class schedule is repeat, check repeat days
      else {
        // check if date is between academic year
        if (c.academicYear)
          return (
            c.schedule.repeat.some((r) =>
              r.repeatDays.includes(new Date(date).getDay())
            ) &&
            +date >= +new Date(c.academicYear.startDate) &&
            +date <= +new Date(c.academicYear.endDate)
          );
        return c.schedule.repeat.some((r) =>
          r.repeatDays.includes(new Date(date).getDay())
        );
      }
    });
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticationGate)
  async deleteClass(
    @Arg("id", () => String) id: string,
    @Ctx() { user }: Context
  ) {
    const c = await this.classRespository.findOne(id, {
      relations: ["user"],
      where: {
        user: user!.id
      }
    });
    if (!c)
      throw new ValidationError(
        "class not found for this user, please check id again"
      );
    await this.classRespository.remove(c);
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticationGate)
  async updateClass(
    @Args() updateContext: UpdateClassArgs,
    @Ctx() { user }: Context
  ) {
    const q = await this.classRespository.findOne(updateContext.id, {
      relations: ["user", "schedule", "academicYear", "term"]
    });
    const updatedSubject = await this.subjectRepository.findOne(
      updateContext.subjectId
    );
    const updatedAcademicYear = await this.academicYearRepository.findOne(
      updateContext.academicYearId
    );
    if (!q || q.user.id !== user!.id || !updatedSubject || !updatedAcademicYear)
      throw new ValidationError("item not found. please provide a valid id");

    q.building = updateContext.building as string;
    q.module = updateContext.module as string;
    q.room = updateContext.room as string;
    q.teacher = updateContext.teacher as string;
    q.academicYear = updatedAcademicYear;
    q.subject = updatedSubject;
    if (updateContext.termId && q.term) {
      const updatedTerm = await this.termRepository.findOne(
        updateContext.termId
      );
      if (!updatedTerm) throw new ValidationError("invalid term id");
      q.term = updatedTerm;
    }

    await this.classRespository.save(q);
    return true;
  }
}
