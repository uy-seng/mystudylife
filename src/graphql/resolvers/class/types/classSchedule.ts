import { ClassSchedule } from "../../../../entity";
import { ClassScheduleType } from "../../../../entity/types";
import { ArgsType, Field, registerEnumType } from "type-graphql";

registerEnumType(ClassScheduleType, {
  name: "ClassScheduleType",
});

@ArgsType()
export class ClassScheduleArgs implements Partial<ClassSchedule> {
  @Field(() => ClassScheduleType)
  type: ClassScheduleType;

  @Field(() => String)
  classId: string;
}
