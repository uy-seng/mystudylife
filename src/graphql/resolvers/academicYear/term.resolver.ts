import { Term } from "../../../entity";
import { Args, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { TermArgs } from "./types";

@Resolver()
export class TermResolver {
  private readonly termRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(Term);

  @Mutation(() => Term)
  async newTerm(
    @Args() { academicYearId, name, startDate, endDate }: TermArgs
  ) {
    const newTerm = this.termRepository.create({
      academicYearId: academicYearId,
      name: name,
      startDate: startDate,
      endDate: endDate,
    });
    return await this.termRepository.save(newTerm);
  }
}
