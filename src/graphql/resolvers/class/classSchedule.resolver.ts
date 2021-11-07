import { Args, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { ClassSchedule } from "../../../entity";
import { ClassScheduleArgs } from "./types";
import { getConnection } from "typeorm";
import { authenticationGate } from "../../../middleware";

@Resolver()
export class ClassScheduleResolver {
  private readonly classScheduleRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(ClassSchedule);

  @Mutation(() => ClassSchedule)
  @UseMiddleware(authenticationGate)
  async newClassSchedule(@Args() { type, classId }: ClassScheduleArgs) {
    const newClassSchedule = this.classScheduleRepository.create({
      classId: classId,
      type: type,
    });
    return await this.classScheduleRepository.save(newClassSchedule);
  }
}
