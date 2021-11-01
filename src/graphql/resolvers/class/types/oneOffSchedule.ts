import { OneOffSchedule } from "src/entity";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class OneOffScheduleArgs implements Partial<OneOffSchedule> {
  @Field(() => String)
  date: string;

  @Field(() => String)
  startTime: string;

  @Field(() => String)
  endTime: string;

  @Field(() => String)
  scheduleId: string;
}

@ArgsType()
export class UpdateOneOffScheduleArgs extends OneOffScheduleArgs {
  @Field(() => String)
  id: string;
}
