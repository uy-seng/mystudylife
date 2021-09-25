import { Args, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { OneOffSchedule } from "src/entity";
import { OneOffScheduleArgs } from "./types";
import { getConnection } from "typeorm";
import { authenticationGate } from "src/middleware";

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
}
