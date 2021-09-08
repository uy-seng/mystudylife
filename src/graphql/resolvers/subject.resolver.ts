import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { SubjectObjectType } from "../types";
import { Subject, AcademicYear, User } from "../../entity";
import { Context } from "../../interface/index.d";
import { ValidationError } from "apollo-server-errors";

@Resolver()
export class SubjectResolver {
  @Mutation(() => SubjectObjectType)
  async createNewSubject(
    @Arg("name") name: string,
    @Arg("academicYearId", { nullable: true }) academicYearId: string,
    @Ctx() { user }: Context
  ) {
    const partialSubject = Subject.create({
      name: name,
    });

    const newSubject = await partialSubject.save();

    if (academicYearId) {
      const qAcademicYear = await AcademicYear.findOne(academicYearId);
      if (!qAcademicYear) throw new ValidationError("invalid academic year id");
    }

    const currentUser = (await User.findOne(user?.id)) as User;
    //   currentUser.subjects = []
    currentUser.save();

    return newSubject;
  }
}
