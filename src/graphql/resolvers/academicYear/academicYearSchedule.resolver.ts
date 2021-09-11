import { AcademicYear } from "src/entity";
import { Args, Mutation, Resolver } from "type-graphql";
import {
  AcademicYearScheduleInput,
  DayRotationScheduleInput,
  WeekRotationScheduleInput,
} from "./types";

@Resolver()
export class AcademicYearScheduleResolver {
  @Mutation(() => AcademicYear)
  async createSchedule(
    @Args() { type, academicYearId }: AcademicYearScheduleInput
  ) {}

  async createPartialWeekRotation(
    @Args() { scheduleId }: WeekRotationScheduleInput
  ) {}

  async createPartialDayRotation(
    @Args() { scheduleId }: DayRotationScheduleInput
  ) {}
}
