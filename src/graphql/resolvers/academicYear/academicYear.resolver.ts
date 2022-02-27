import { AcademicYear, User } from "../../../entity";
import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";
import { AcademicYearArgs } from "./types";
import { ForbiddenError, ValidationError } from "apollo-server-errors";
import { authenticationGate } from "../../../middleware";
import { Context } from "../../../interface";

@Resolver()
export class AcademicYearResolver {
  private readonly academicYearRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(AcademicYear);

  @Mutation(() => AcademicYear)
  @UseMiddleware(authenticationGate)
  async newAcademicYear(
    @Args() { startDate, endDate }: AcademicYearArgs,
    @Ctx() { user }: Context
  ) {
    const newAcademicYear = this.academicYearRepository.create({
      startDate: startDate,
      endDate: endDate
    });
    const userRepository = getConnection(process.env.NODE_ENV).getRepository(
      User
    );
    const qUser = await userRepository.findOne(user!.id);
    if (!qUser) throw new ValidationError("invalid user");
    newAcademicYear.user = qUser;
    return await this.academicYearRepository.save(newAcademicYear);
  }

  @Query(() => [AcademicYear])
  @UseMiddleware(authenticationGate)
  async getAcademicYears(@Ctx() { user }: Context) {
    const academicYears = await this.academicYearRepository.find({
      relations: [
        "terms",
        "user",
        "schedule",
        "schedule.dayRotation",
        "schedule.weekRotation",
        "holidays"
      ],
      where: {
        user: {
          id: user!.id
        }
      }
    });
    return academicYears;
  }

  @Query(() => AcademicYear, { nullable: true })
  @UseMiddleware(authenticationGate)
  async getAcademicYear(
    @Arg("id", { nullable: true }) id: string,
    @Ctx() { user }: Context
  ) {
    if (id) {
      const academicYear = await this.academicYearRepository.findOne(id, {
        relations: [
          "terms",
          "schedule",
          "schedule.dayRotation",
          "schedule.weekRotation",
          "user"
        ]
      });
      if (!academicYear) throw new ValidationError("invalid academic year id");
      if (academicYear?.user.id !== user!.id)
        throw new ForbiddenError("academic year not found for this user");
      return academicYear;
    }
    return null;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticationGate)
  async deleteAcademicYear(@Arg("id") id: string, @Ctx() { user }: Context) {
    const academicYear = await this.academicYearRepository.findOne(id, {
      relations: ["user"]
    });
    if (!academicYear) throw new ValidationError("invalid id");
    if (academicYear.user.id !== user!.id)
      throw new ForbiddenError("academic year not found for this user");
    await this.academicYearRepository.delete(academicYear);
    return true;
  }
}
