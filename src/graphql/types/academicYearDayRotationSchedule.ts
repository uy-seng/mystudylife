import { Field, InputType, Int, ObjectType } from "type-graphql";
import { dayOfWeek } from "../../entity/types/index";
// import { AcademicYearObjectType } from ".";

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

  // @Field(() => AcademicYearObjectType)
  // academicYear: AcademicYearObjectType;
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
