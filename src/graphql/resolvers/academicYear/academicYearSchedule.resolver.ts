import {
  AcademicYearSchedule,
  DayRotationSchedule,
  WeekRotationSchedule,
} from "../../../entity";
import { Args, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import {
  AcademicYearScheduleArgs,
  DayRotationScheduleArgs,
  WeekRotationScheduleArgs,
} from "./types";

@Resolver()
export class AcademicYearScheduleResolver {
  private readonly scheduleRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(AcademicYearSchedule);
  private readonly weekRotationScheduleRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(WeekRotationSchedule);
  private readonly dayRotationScheduleRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(DayRotationSchedule);

  @Mutation(() => AcademicYearSchedule)
  async newSchedule(
    @Args() { type, academicYearId }: AcademicYearScheduleArgs
  ) {
    const newSchedule = await this.scheduleRepository.create({
      type: type,
      academicYearId: academicYearId,
    });
    return await this.scheduleRepository.save(newSchedule);
  }

  @Mutation(() => WeekRotationSchedule)
  async newPartialWeekRotation(
    @Args() { scheduleId, numOfWeek, startWeek }: WeekRotationScheduleArgs
  ) {
    const newWeekRotationSchedule = this.weekRotationScheduleRepository.create({
      numOfWeek: numOfWeek,
      startWeek: startWeek,
      scheduleId: scheduleId,
    });
    return await this.weekRotationScheduleRepository.save(
      newWeekRotationSchedule
    );
  }

  @Mutation(() => DayRotationSchedule)
  async newPartialDayRotation(
    @Args()
    { scheduleId, numOfDay, repeatDays, startDay }: DayRotationScheduleArgs
  ) {
    const newDayRotationSchedule = this.dayRotationScheduleRepository.create({
      startDay: startDay,
      numOfDay: numOfDay,
      repeatDays: repeatDays,
      scheduleId: scheduleId,
    });
    return await this.dayRotationScheduleRepository.save(
      newDayRotationSchedule
    );
  }
}
