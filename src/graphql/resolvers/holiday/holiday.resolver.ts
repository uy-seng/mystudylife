import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { authenticationGate } from "../../../middleware";
import { HolidayArgs, UpdateHolidayArgs } from "./types";
import { Context } from "../../../interface";
import { getConnection } from "typeorm";
import { AcademicYear, Holiday, User } from "../../../entity";
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
      endDate: endDate,
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

  @Mutation(() => Boolean)
  @UseMiddleware(authenticationGate)
  async deleteHoliday(
    @Arg("id", () => String) id: string,
    @Ctx() { user }: Context
  ) {
    const holiday = await this.holidayRepository.findOne(id, {
      relations: ["user"],
      where: {
        user: {
          id: user!.id,
        },
      },
    });
    if (!holiday) throw new ValidationError("invalid holiday id");
    await this.holidayRepository.remove(holiday);
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticationGate)
  async updateHoliday(
    @Args() updateContext: UpdateHolidayArgs,
    @Ctx() { user }: Context
  ) {
    const holiday = await this.holidayRepository.findOne(updateContext.id, {
      relations: ["user"],
      where: {
        user: {
          id: user!.id,
        },
      },
    });
    if (!holiday) throw new ValidationError("invalid holiday id");
    holiday.name = updateContext.name;
    holiday.startDate = updateContext.startDate;
    holiday.endDate = updateContext.endDate;
    await this.holidayRepository.save(holiday);
    return true;
  }
}
