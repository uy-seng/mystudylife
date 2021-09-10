import { Field, InputType, Int, ObjectType } from "type-graphql";

@ObjectType()
export class AcademicYearWeekRotationScheduleObjectType {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  numOfWeek: number;

  @Field(() => Int)
  startWeek: number;
}

@InputType()
export class AcademicYearWeekRotationScheduleInputType {
  @Field(() => Int)
  numOfWeek: number;

  @Field(() => Int)
  startWeek: number;
}
