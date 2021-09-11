import { DayRotationSchedule } from "src/entity";
import { DayOfWeek } from "src/entity/types";
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
