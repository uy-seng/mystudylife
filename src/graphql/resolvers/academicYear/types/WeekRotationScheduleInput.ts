import { WeekRotationSchedule } from "src/entity";
import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class WeekRotationScheduleArgs implements Partial<WeekRotationSchedule> {
  @Field(() => Int)
  numOfWeek: number;

  @Field(() => Int)
  startWeek: number;

  @Field(() => String)
  scheduleId: string;
}
