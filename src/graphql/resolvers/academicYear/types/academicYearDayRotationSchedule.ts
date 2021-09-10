import { dayOfWeek } from "src/entity/types";
import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class AcademicYearDayRotationScheduleObjectType {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  numOfDay: number;

  @Field(() => Int)
  startDay: number;

  @Field(() => Int)
  repeatDay: dayOfWeek;
}

@InputType()
export class AcademicYearDayRotationScheduleInputType {
  @Field(() => Int)
  numOfDay: number;

  @Field(() => Int)
  startDay: number;

  @Field(() => [Int])
  repeatDays: dayOfWeek[];
}
