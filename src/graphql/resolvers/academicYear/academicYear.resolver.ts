import { getConnection } from "typeorm";
import {
  Mutation,
  Resolver,
  UseMiddleware,
  registerEnumType,
  Ctx,
  Args,
} from "type-graphql";
import { ValidationError } from "apollo-server-errors";
import { AcademicYearObjectType } from "./types";
import {
  AcademicYear,
  AcademicYearTerm,
  AcademicYearDayRotationSchedule,
  AcademicYearWeekRotationSchedule,
  User,
} from "src/entity";
import { academicYearSchedulingType } from "src/entity/types";
import { authenticationGate } from "src/middleware";
import { Context } from "src/interface";
import { createNewAcademicYearArgs } from "./types/academicYear";

registerEnumType(academicYearSchedulingType, {
  name: "schedulingType", // this one is mandatory
});

//? refactor arg into arg type class
@Resolver()
export class AcademicYearResolver {
  @Mutation(() => AcademicYearObjectType)
  @UseMiddleware(authenticationGate)
  async createNewAcademicYear(
    @Args()
    {
      startDate,
      endDate,
      schedulingType,
      terms,
      weekRotationSchedule,
      dayRotationSchedule,
    }: createNewAcademicYearArgs,
    @Ctx() { user }: Context
  ): Promise<AcademicYearObjectType> {
    /**
     * repository
     */
    const academicYearRepository = await getConnection(
      process.env.NODE_ENV
    ).getRepository(AcademicYear);
    const academicYearTermRepository = await getConnection(
      process.env.NODE_ENV
    ).getRepository(AcademicYearTerm);
    const academicYearDayRotationScheduleRepository = await getConnection(
      process.env.NODE_ENV
    ).getRepository(AcademicYearDayRotationSchedule);
    const academicYearWeekRotationScheduleRepository = await getConnection(
      process.env.NODE_ENV
    ).getRepository(AcademicYearWeekRotationSchedule);
    const userRepository = await getConnection(
      process.env.NODE_ENV
    ).getRepository(User);

    const partialAcademicYear = academicYearRepository.create({
      startDate: startDate,
      endDate: endDate,
      schedulingType: schedulingType,
    });

    /**
     * creating terms for current academic year
     */
    if (terms)
      partialAcademicYear.terms = terms.map((term) => {
        const newTerm = academicYearTermRepository.create({
          ...term,
        });
        return newTerm;
      });

    /**
     * creating schedulings for current academic year
     */
    if (schedulingType === "day_rotation") {
      if (dayRotationSchedule) {
        partialAcademicYear.dayRotationSchedules =
          dayRotationSchedule.repeatDays.map((day) => {
            const newDayRotationSchedule =
              academicYearDayRotationScheduleRepository.create({
                numOfDay: dayRotationSchedule.numOfDay,
                startDay: dayRotationSchedule.startDay,
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
          academicYearWeekRotationScheduleRepository.create({
            numOfWeek: weekRotationSchedule.numOfWeek,
            startWeek: weekRotationSchedule.startWeek,
          });
      } else {
        throw new ValidationError("require week rotation schedule(s)");
      }
    }

    const newAcademicYear = await academicYearRepository.save(
      partialAcademicYear
    );

    const currentUser: User = (await userRepository.findOne({
      where: {
        id: user!.id,
      },
      relations: ["academicYears"],
    })) as User;
    if (currentUser.academicYears) {
      currentUser.academicYears.push(newAcademicYear);
    } else {
      currentUser.academicYears = [newAcademicYear];
    }
    await userRepository.save(currentUser);
    return newAcademicYear;
  }
}
