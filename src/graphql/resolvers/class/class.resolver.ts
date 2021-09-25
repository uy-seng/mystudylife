import { Args, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Class, Subject, User } from "src/entity";
import { ClassArgs } from "./types";
import { getConnection } from "typeorm";
import { ValidationError } from "apollo-server-errors";
import { authenticationGate } from "src/middleware";
import { Context } from "src/interface";

@Resolver()
export class ClassResolver {
  private readonly classRespository = getConnection(
    process.env.NODE_ENV
  ).getRepository(Class);
  private readonly subjectRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(Subject);
  private readonly userRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(User);

  @Mutation(() => Class)
  @UseMiddleware(authenticationGate)
  async newClass(
    @Args() { subjectId, building, module, room, teacher }: ClassArgs,
    @Ctx() { user }: Context
  ) {
    const newClass = this.classRespository.create({
      building: building,
      module: module,
      room: room,
      teacher: teacher,
    });

    const subject = await this.subjectRepository.findOne(subjectId);
    if (!subject) throw new ValidationError("invalid subject id");
    newClass.subject = subject;

    const qUser = (await this.userRepository.findOne(user!.id)) as User;
    newClass.user = qUser;

    return await this.classRespository.save(newClass);
  }
}
