import { Args, Resolver } from "type-graphql";
import { AcademicYearInput } from "./types";

@Resolver()
export class AcademicYearResolver {
  async createNewAcademicYear(
    @Args() { id, startDate, endDate, scheduleId, termId }: AcademicYearInput
  ) {}
}
