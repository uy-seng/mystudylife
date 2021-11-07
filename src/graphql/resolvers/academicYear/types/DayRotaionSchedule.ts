import { DayRotationSchedule } from "../../../../entity";
import { DayOfWeek } from "../../../../entity/types";
import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class DayRotationScheduleArgs implements Partial<DayRotationSchedule> {
  @Field(() => Int)
  startDay: number;

  @Field(() => Int)
  numOfDay: number;

  @Field(() => [Int])
  repeatDays: DayOfWeek[];

  @Field(() => String)
  scheduleId: string;
}
