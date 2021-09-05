import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import {
  AcademicYearDayRotationScheduleInputType,
  AcademicYearObjectType,
  AcademicYearTermInputType,
  AcademicYearWeekRotationScheduleInputType,
} from "../types";
import { registerEnumType } from "type-graphql";
import { academicYearSchedulingType } from "../../entity/types/academicYear";
import { AcademicYear, User } from "../../entity";
import { ValidationError } from "apollo-server-errors";
import { AcademicYearDayRotationSchedule } from "../../entity/AcademicYearDayRotationSchedule";
import { AcademicYearWeekRotationSchedule } from "../../entity/AcademicYearWeekRotationSchedule";
import { authenticationGate } from "../../middleware/auth.middleware";
import { Context } from "../../interface/index.d";

registerEnumType(academicYearSchedulingType, {
  name: "schedulingType", // this one is mandatory
});

@Resolver()
export class AcademicYearResolver {
  @Mutation(() => AcademicYearObjectType)
  @UseMiddleware(authenticationGate)
  async createNewAcademicYear(
    @Arg("startDate") startDate: string,
    @Arg("endDate") endDate: string,
    @Arg("schedulingType", () => academicYearSchedulingType)
    schedulingType: academicYearSchedulingType,
    @Arg("terms", () => [AcademicYearTermInputType], { nullable: true })
    terms: AcademicYearTermInputType[],
    @Arg(
      "weekRotationSchedules",
      () => AcademicYearWeekRotationScheduleInputType,
      { nullable: true }
    )
    weekRotationSchedules: AcademicYearWeekRotationScheduleInputType[] | null,
    @Arg(
      "dayRotationSchedules",
      () => AcademicYearDayRotationScheduleInputType,
      { nullable: true }
    )
    dayRotationSchedules: AcademicYearDayRotationScheduleInputType | null,
    @Ctx() { user }: Context
  ): Promise<AcademicYearObjectType> {
    const partialAcademicYear = AcademicYear.create({
      start_date: startDate,
      end_date: endDate,
      schedulingType: schedulingType,
      terms: terms,
    });
    if (schedulingType === "day_rotation") {
      if (dayRotationSchedules) {
        partialAcademicYear.dayRotationSchedules =
          dayRotationSchedules.repeatDay.map((day) => {
            const newDayRotationSchedule =
              AcademicYearDayRotationSchedule.create({
                num_of_day: dayRotationSchedules.num_of_day,
                start_day: dayRotationSchedules.start_day,
                repeatDay: day,
              });
            return newDayRotationSchedule;
          });
      } else {
        throw new ValidationError("require day rotation schedule(s)");
      }
    } else if (schedulingType === "week_rotation") {
      if (weekRotationSchedules) {
        partialAcademicYear.weekRotationSchedules = weekRotationSchedules.map(
          (weekRotationSchedule) => {
            const newWeekRotationSchedule =
              AcademicYearWeekRotationSchedule.create({
                ...weekRotationSchedule,
                academicYear: partialAcademicYear,
              });
            return newWeekRotationSchedule;
          }
        );
      } else {
        throw new ValidationError("require week rotation schedule(s)");
      }
    }
    const newAcademicYear = await partialAcademicYear.save();
    const currentUser: User = (await User.findOne({ id: user!.id })) as User;
    if (currentUser.academicYears) {
    } else {
      currentUser.academicYears = [newAcademicYear];
    }
    currentUser.save();
    return newAcademicYear;
  }

  @Query(() => AcademicYearObjectType)
  getAcademicYear(@Arg("id") id: string) {
    return AcademicYear.findOneOrFail(id, {
      relations: ["dayRotationSchedules", "user"],
    });
  }
}
