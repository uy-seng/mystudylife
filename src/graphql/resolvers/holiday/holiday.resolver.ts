import { Args, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { authenticationGate } from "src/middleware";
import { HolidayArgs } from "./types";
import { Context } from "src/interface";
import { getConnection } from "typeorm";
import { AcademicYear, Holiday, User } from "src/entity";
import { ValidationError } from "apollo-server-errors";

@Resolver()
export class HolidayResolver {
  private readonly holidayRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(Holiday);
  private readonly userRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(User);
  private readonly academicYearRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(AcademicYear);

  @Mutation(() => Holiday)
  @UseMiddleware(authenticationGate)
  async newHoliday(
    @Args() { startDate, endDate, academicYearId, name }: HolidayArgs,
    @Ctx() { user }: Context
  ) {
    const newHoliday = this.holidayRepository.create({
      name: name,
      startDate: startDate,
      endDate: endDate
    });
    const currentUser = await this.userRepository.findOne(user!.id);
    if (!currentUser) throw new ValidationError("invalid user");
    newHoliday.user = currentUser;
    const academicYear = await this.academicYearRepository.findOne(
      academicYearId
    );
    if (!academicYear) throw new ValidationError("invalid academic year id");
    newHoliday.academicYear = academicYear;
    return await this.holidayRepository.save(newHoliday);
  }
}
