import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { AcademicYear, Class, Subject, User } from "src/entity";
import { ClassArgs } from "./types";
import { getConnection } from "typeorm";
import { ValidationError } from "apollo-server-errors";
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

  @Mutation(() => Class)
  @UseMiddleware(authenticationGate)
  async newClass(
    @Args()
    { subjectId, building, module, room, teacher, academicYearId }: ClassArgs,
    @Ctx() { user }: Context
  ) {
    const newClass = this.classRespository.create({
      building: building,
      module: module,
      room: room,
      teacher: teacher,
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

    const qUser = (await this.userRepository.findOne(user!.id)) as User;
    newClass.user = qUser;

    return await this.classRespository.save(newClass);
  }

  @Query(() => [Class])
  @UseMiddleware(authenticationGate)
  async getClassesByDate(
    @Arg("date", () => Date) date: Date,
    @Ctx() { user }: Context
  ) {
    const classes = await this.classRespository.find({
      relations: ["schedule", "schedule.oneOff", "schedule.repeat", "user"],
      where: {
        user: {
          id: user!.id,
        },
      },
    });
    return classes.filter((c) => {
      // if class schedule is oneOff, check date
      if (c.schedule.type === "oneOff")
        return +new Date(c.schedule.oneOff.date) === +date;
      // if class schedule is repeat, check repeat days
      else
        return c.schedule.repeat.repeatDays.includes(new Date(date).getDay());
    });
  }
}
