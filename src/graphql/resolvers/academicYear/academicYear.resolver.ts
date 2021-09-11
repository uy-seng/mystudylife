import { AcademicYear, AcademicYearSchedule, Term } from "src/entity";
import { Args, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { AcademicYearArgs } from "./types";
import { ValidationError } from "apollo-server-errors";

@Resolver()
export class AcademicYearResolver {
  private readonly academicYearRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(AcademicYear);
  private readonly scheduleRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(AcademicYearSchedule);
  private readonly termRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(Term);
  @Mutation(() => AcademicYear)
  async newAcademicYear(
    @Args() { id, startDate, endDate, scheduleId, termIds }: AcademicYearArgs
  ) {
    const newAcademicYear = this.academicYearRepository.create({
      id: id,
      startDate: startDate,
      endDate: endDate,
    });
    if (scheduleId) {
      const schedule = await this.scheduleRepository.findOne(scheduleId);
      if (!schedule) throw new ValidationError("invalid schedule id");
      newAcademicYear.schedule = schedule;
    }
    if (termIds) {
      const terms = await Promise.all(
        termIds?.map(async (termId, index) => {
          const term = await this.termRepository.findOne(termId);
          if (!term)
            throw new ValidationError(`invalid term id at index ${index}`);
          return term as Term;
        })
      );
      newAcademicYear.terms = terms;
    }
    return await this.academicYearRepository.save(newAcademicYear);
  }
}
