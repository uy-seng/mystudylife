import { ClassSchedule } from "src/entity";
import { ClassScheduleType } from "src/entity/types/ClassSchedule";
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
