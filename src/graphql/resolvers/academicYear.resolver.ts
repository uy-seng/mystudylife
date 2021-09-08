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
import { AcademicYearTerm } from "../../entity/AcademicYearTerm";

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
    terms: AcademicYearTermInputType[] | null,
    @Arg(
      "weekRotationSchedule",
      () => AcademicYearWeekRotationScheduleInputType,
      { nullable: true }
    )
    weekRotationSchedule: AcademicYearWeekRotationScheduleInputType | null,
    @Arg(
      "dayRotationSchedules",
      () => AcademicYearDayRotationScheduleInputType,
      { nullable: true }
    )
    dayRotationSchedules: AcademicYearDayRotationScheduleInputType | null,
    @Ctx() { user }: Context
  ): Promise<AcademicYearObjectType> {
    const partialAcademicYear = AcademicYear.create({
      startDate: startDate,
      endDate: endDate,
      schedulingType: schedulingType,
    });
    if (terms)
      partialAcademicYear.terms = terms.map((term) => {
        const newTerm = AcademicYearTerm.create({
          ...term,
        });
        return newTerm;
      });
    if (schedulingType === "day_rotation") {
      if (dayRotationSchedules) {
        partialAcademicYear.dayRotationSchedules =
          dayRotationSchedules.repeatDays.map((day) => {
            const newDayRotationSchedule =
              AcademicYearDayRotationSchedule.create({
                numOfDay: dayRotationSchedules.numOfDay,
                startDay: dayRotationSchedules.startDay,
                repeatDay: day,
              });
            return newDayRotationSchedule;
          });
      } else {
        throw new ValidationError("require day rotation schedule(s)");
      }
    } else if (schedulingType === "week_rotation") {
      if (weekRotationSchedule) {
        partialAcademicYear.weekRotationSchedule =
          AcademicYearWeekRotationSchedule.create({
            numOfWeek: weekRotationSchedule.numOfWeek,
            startWeek: weekRotationSchedule.startWeek,
          });
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
