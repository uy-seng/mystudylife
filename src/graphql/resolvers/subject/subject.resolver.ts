import { ForbiddenError, ValidationError } from "apollo-server-errors";
import { Subject, AcademicYear, User } from "src/entity";
import { Context } from "src/interface";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { authenticationGate } from "src/middleware";

@Resolver()
export class SubjectResolver {
  private readonly subjectRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(Subject);
  private readonly academicYearRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(AcademicYear);
  private readonly userRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(User);

  @Mutation(() => Subject)
  @UseMiddleware(authenticationGate)
  async newSubject(
    @Arg("name") name: string,
    @Arg("academicYearId", { nullable: true }) academicYearId: string,
    @Ctx() { user }: Context
  ) {
    const partialSubject = this.subjectRepository.create({
      name: name,
    });
    const newSubject = await this.subjectRepository.save(partialSubject);
    if (academicYearId) {
      const academicYear = await this.academicYearRepository.findOne(
        academicYearId
      );
      if (!academicYear) throw new ValidationError("invalid academic year id");
      newSubject.academicYear = academicYear;
    }
    const currentUser = (await this.userRepository.findOne(user!.id)) as User;
    newSubject.user = currentUser;
    return await this.subjectRepository.save(newSubject);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticationGate)
  async deleteSubject(@Arg("id") id: string, @Ctx() { user }: Context) {
    const subject = await this.subjectRepository.findOne(id, {
      relations: ["user"],
    });
    if (!subject) throw new ValidationError("invalid id");
    if (subject.user.id !== user!.id)
      throw new ForbiddenError("subject not found for this user");
    await this.subjectRepository.delete(subject);
    return true;
  }

  @Query(() => [Subject])
  @UseMiddleware(authenticationGate)
  async getSubjects(@Ctx() { user }: Context) {
    const subjects = await this.subjectRepository.find({
      relations: ["academicYear"],
      where: {
        user: {
          id: user!.id,
        },
      },
    });
    return subjects;
  }

  @Query(() => Subject)
  @UseMiddleware(authenticationGate)
  async getSubject(@Arg("id") id: string, @Ctx() { user }: Context) {
    const subject = await this.subjectRepository.findOne(id, {
      relations: ["academicYear"],
    });
    if (!subject) throw new ValidationError("invalid subject id");
    if (subject?.user.id !== user!.id)
      throw new ForbiddenError("academic year not found for this user");
    return subject;
  }
}
