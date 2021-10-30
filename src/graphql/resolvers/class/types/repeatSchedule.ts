import { RepeatSchedule } from "src/entity";
import { DayOfWeek } from "src/entity/types";
import { ArgsType, Field, Int, registerEnumType } from "type-graphql";

registerEnumType(DayOfWeek, {
  name: "DayOfWeek",
});

@ArgsType()
export class RepeatScheduleArgs implements Partial<RepeatSchedule> {
  @Field(() => String)
  startTime: string;

  @Field(() => String)
  endTime: string;

  @Field(() => [DayOfWeek])
  repeatDays: DayOfWeek[];

  @Field(() => String)
  scheduleId: string;

  @Field(() => String, { nullable: true })
  startDate: string;

  @Field(() => String, { nullable: true })
  endDate: string;

  @Field(() => Int, { nullable: true })
  rotationWeek: number;
}
