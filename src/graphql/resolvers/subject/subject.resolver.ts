import {
  ForbiddenError,
  ValidationError,
  ApolloError,
} from "apollo-server-errors";
import { Subject, AcademicYear, User, Term } from "src/entity";
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
  private readonly termRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(Term);

  @Mutation(() => Subject)
  @UseMiddleware(authenticationGate)
  async newSubject(
    @Arg("name") name: string,
    @Arg("academicYearId", { nullable: true }) academicYearId: string,
    @Arg("termId", { nullable: true }) termId: string,
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

    if (termId) {
      const term = await this.termRepository.findOne(termId);
      if (!term) throw new ValidationError("invalid term id");
      newSubject.term = term;
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

  @Mutation(() => Boolean)
  @UseMiddleware(authenticationGate)
  async updateSubject(
    @Arg("id", () => String) id: string,
    @Arg("name") name: string,
    @Arg("academicYearId", { nullable: true }) academicYearId: string,
    @Ctx() { user }: Context
  ) {
    const q = await this.subjectRepository.findOne(id, {
      relations: ["user"],
      where: {
        user: {
          id: user!.id,
        },
      },
    });
    if (!q) throw new ApolloError("item not found. please provide a valid id");
    q.name = name;
    if (
      academicYearId &&
      (!q.academicYear || q.academicYear.id !== academicYearId)
    ) {
      const toBeUpdatedAcademicYear = await this.academicYearRepository.findOne(
        academicYearId
      );
      if (!toBeUpdatedAcademicYear)
        throw new ApolloError(
          "item not found. pleaase provide a valid academic year id"
        );
      q.academicYear = toBeUpdatedAcademicYear;
    }
    await this.subjectRepository.save(q);
    return true;
  }
}
