import { AcademicYear } from "src/entity";
import { Args, Mutation, Resolver } from "type-graphql";
import { TermInput } from "./types";

@Resolver()
export class TermResolver {
  @Mutation(() => AcademicYear)
  async createTerm(
    @Args() { academicYearId, name, startDate, endDate }: TermInput
  ) {}
}
