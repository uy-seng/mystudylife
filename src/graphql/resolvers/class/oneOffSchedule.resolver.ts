import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { OneOffSchedule } from "src/entity";
import { OneOffScheduleArgs } from "./types";
import { getConnection } from "typeorm";
import { authenticationGate } from "src/middleware";
import { Context } from "src/interface";
import { ValidationError } from "apollo-server-express";

@Resolver()
export class OneOffScheduleResolver {
  private readonly oneOffScheduleRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(OneOffSchedule);

  @Mutation(() => OneOffSchedule)
  @UseMiddleware(authenticationGate)
  async newOneOffSchedule(
    @Args() { startTime, endTime, date, scheduleId }: OneOffScheduleArgs
  ) {
    const oneOffSchedule = this.oneOffScheduleRepository.create({
      startTime: startTime,
      endTime: endTime,
      date: date,
      scheduleId: scheduleId,
    });
    return await this.oneOffScheduleRepository.save(oneOffSchedule);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticationGate)
  async updateOneOffSchedule(
    @Arg("id", () => String) id: string,
    @Args() updateContext: OneOffScheduleArgs,
    @Ctx() { user }: Context
  ) {
    const q = await this.oneOffScheduleRepository.findOne(id, {
      relations: ["schedule", "schedule.class", "schedule.class.user"],
    });
    if (q?.schedule.class.user.id !== user!.id || !q)
      throw new ValidationError("items not found, please provide a valid id");
    q.date = updateContext.date;
    q.endTime = updateContext.endTime;
    q.startTime = updateContext.startTime;
    await this.oneOffScheduleRepository.save(q);
    return true;
  }
}
