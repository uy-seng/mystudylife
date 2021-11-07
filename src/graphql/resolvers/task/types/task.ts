import { Task } from "../../../../entity";
import { TaskType } from "../../../../entity/types";
import { ArgsType, Field, registerEnumType } from "type-graphql";

registerEnumType(TaskType, {
  name: "TaskType",
});

@ArgsType()
export class TaskArgs implements Partial<Task> {
  @Field(() => String)
  subjectId: string;

  @Field(() => String, { nullable: true })
  academicYearId: string;

  @Field(() => TaskType)
  type: TaskType;

  @Field(() => String)
  due_date: string;

  @Field(() => String, { defaultValue: "" })
  title?: string;

  @Field(() => String, { defaultValue: "" })
  detail?: string;
}

@ArgsType()
export class UpdateTaskArgs extends TaskArgs {
  @Field(() => String)
  id: string;
}
