import { WeekRotationSchedule } from "src/entity";
import { Field, InputType } from "type-graphql";

@InputType()
export class WeekRotationScheduleInput
  implements Partial<WeekRotationSchedule>
{
  @Field(() => String)
  scheduleId: string;
}
