import { Field, InputType, Int, ObjectType } from "type-graphql";
import { classIncurType } from "../../entity/types/classIncur";
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
  start_date: string;

  @Field(() => String)
  end_date: string;

  @Field(() => Int)
  repeatDay: dayOfWeek;

  @Field(() => ClassObjectType)
  class: ClassObjectType;
}

@InputType()
export class ClassIncurInputType {
  @Field(() => classIncurType)
  type: classIncurType;

  @Field(() => String)
  start_time: string;

  @Field(() => String)
  end_time: string;

  @Field(() => String)
  start_date: string;

  @Field(() => String)
  end_date: string;

  @Field(() => dayOfWeek)
  repeatDay: dayOfWeek;
}
