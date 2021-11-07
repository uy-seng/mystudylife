import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { RepeatSchedule } from "src/entity";
import { RepeatScheduleArgs } from "./types";
import { getConnection } from "typeorm";
import { authenticationGate } from "src/middleware";
import { Context } from "src/interface";
import { ValidationError } from "apollo-server-express";

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
      rotationWeek,
    }: RepeatScheduleArgs
  ) {
    const repeatSchedule = this.repeatScheduleRepository.create({
      startTime: startTime,
      endTime: endTime,
      repeatDays: repeatDays,
      scheduleId: scheduleId,
      startDate: startDate,
      endDate: endDate,
      rotationWeek: rotationWeek,
    });
    return await this.repeatScheduleRepository.save(repeatSchedule);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticationGate)
  async updateRepeatSchedule(
    @Arg("id", () => String) id: string,
    @Args() updateContext: RepeatScheduleArgs,
    @Ctx() { user }: Context
  ) {
    const q = await this.repeatScheduleRepository.findOne(id, {
      relations: ["schedule", "schedule.class", "schedule.class.user"],
    });
    if (q?.schedule.class.user.id !== user!.id || !q)
      throw new ValidationError("items not found, please provide a valid id");
    q.startDate = updateContext.startDate;
    q.startTime = updateContext.startTime;
    q.endDate = updateContext.endDate;
    q.endTime = updateContext.endTime;
    q.rotationWeek = updateContext.rotationWeek;
    q.repeatDays = updateContext.repeatDays;
    await this.repeatScheduleRepository.save(q);
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticationGate)
  async deleteRepeatSchedule(
    @Arg("id", () => String) id: string,
    @Ctx() { user }: Context
  ) {
    const q = await this.repeatScheduleRepository.findOne(id, {
      relations: ["schedule", "schedule.class", "schedule.class.user"],
      where: {
        schedule: {
          class: {
            user: {
              id: user!.id,
            },
          },
        },
      },
    });
    if (!q)
      throw new ValidationError("item not found, please provide a valid id");
    this.repeatScheduleRepository.remove(q);
    return true;
  }
}
