import { Field, InputType, Int, ObjectType } from "type-graphql";
import { AcademicYearObjectType } from ".";

@ObjectType()
export class AcademicYearWeekRotationScheduleObjectType {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  num_of_week: number;

  @Field(() => Int)
  start_week: number;

  @Field(() => AcademicYearObjectType)
  academicYear: AcademicYearObjectType;
}

@InputType()
export class AcademicYearWeekRotationScheduleInputType {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  num_of_week: number;

  @Field(() => Int)
  start_week: number;
}
