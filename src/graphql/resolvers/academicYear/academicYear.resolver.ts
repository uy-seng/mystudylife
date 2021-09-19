import { AcademicYear } from "src/entity";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { AcademicYearArgs } from "./types";
import { ValidationError } from "apollo-server-errors";

@Resolver()
export class AcademicYearResolver {
  private readonly academicYearRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(AcademicYear);

  @Mutation(() => AcademicYear)
  async newAcademicYear(@Args() { startDate, endDate }: AcademicYearArgs) {
    const newAcademicYear = this.academicYearRepository.create({
      startDate: startDate,
      endDate: endDate,
    });
    return await this.academicYearRepository.save(newAcademicYear);
  }

  @Query(() => [AcademicYear])
  async getAcademicYears() {
    const academicYears = await this.academicYearRepository.find({
      relations: [
        "terms",
        "schedule",
        "schedule.dayRotation",
        "schedule.weekRotation",
      ],
    });
    return academicYears;
  }

  @Mutation(() => Boolean)
  async deleteAcademicYear(@Arg("id") id: string) {
    const academicYear = await this.academicYearRepository.findOne(id);
    if (!academicYear) throw new ValidationError("invalid id");
    await this.academicYearRepository.delete(academicYear);
    return true;
  }
}
