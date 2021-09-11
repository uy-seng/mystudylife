import { DayRotationSchedule } from "src/entity";
import { Field, InputType } from "type-graphql";

@InputType()
export class DayRotationScheduleInput implements Partial<DayRotationSchedule> {
  @Field(() => String)
  scheduleId: string;
}
