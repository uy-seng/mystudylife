import { Field, InputType, ObjectType } from "type-graphql";
import { TaskObjectType, UserObjectType } from ".";
import { Task, User } from "../../entity";

@ObjectType()
export class ExamObjectType {
  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  resit: boolean;

  @Field(() => String)
  module: string;

  @Field(() => String)
  date: string;

  @Field(() => String)
  start_time: string;

  @Field(() => String)
  end_time: string;

  @Field(() => String)
  seat: string;

  @Field(() => String)
  room: string;

  @Field(() => [TaskObjectType])
  tasks: TaskObjectType[];

  @Field(() => UserObjectType)
  user: UserObjectType;
}

@InputType()
export class ExamInputType {
  @Field(() => Boolean)
  resit: boolean;

  @Field(() => String)
  module: string;

  @Field(() => String)
  date: string;

  @Field(() => String)
  start_time: string;

  @Field(() => String)
  end_time: string;

  @Field(() => String)
  seat: string;

  @Field(() => String)
  room: string;

  @Field(() => [Task])
  tasks: Task[];

  @Field(() => User)
  user: User;
}
