import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  classIncurRepeatDayType,
  classIncurType,
} from "../../entity/types/classIncur";
import { dayOfWeek } from "../../entity/types";
import { ClassObjectType } from ".";

@ObjectType()
export class ClassIncurObjectType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  type: classIncurType;

  @Field(() => String)
  start_time: string;

  @Field(() => String)
  end_time: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  @Field(() => Int)
  repeatDay: dayOfWeek;

  @Field(() => ClassObjectType)
  class: ClassObjectType;
}

@InputType()
export class ClassIncurInputType {
  @Field(() => classIncurType)
  type: classIncurType;

  @Field(() => classIncurRepeatDayType)
  dayType: classIncurRepeatDayType;

  @Field(() => String)
  start_time: string;

  @Field(() => String)
  end_time: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  @Field(() => dayOfWeek)
  repeatDay: dayOfWeek;
}
