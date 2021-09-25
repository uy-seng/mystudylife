import { Args, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { RepeatSchedule } from "src/entity";
import { RepeatScheduleArgs } from "./types";
import { getConnection } from "typeorm";
import { authenticationGate } from "src/middleware";

@Resolver()
export class RepeatScheduleResolver {
  private readonly repeatScheduleRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(RepeatSchedule);

  @Mutation(() => RepeatSchedule)
  @UseMiddleware(authenticationGate)
  async newRepeatSchedule(
    @Args()
    {
      startTime,
      endTime,
      repeatDays,
      scheduleId,
      startDate,
      endDate,
    }: RepeatScheduleArgs
  ) {
    const repeatSchedule = this.repeatScheduleRepository.create({
      startTime: startTime,
      endTime: endTime,
      repeatDays: repeatDays,
      scheduleId: scheduleId,
      startDate: startDate,
      endDate: endDate,
    });
    return await this.repeatScheduleRepository.save(repeatSchedule);
  }
}
