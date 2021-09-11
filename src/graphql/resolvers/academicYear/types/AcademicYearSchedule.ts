import { AcademicYearSchedule } from "src/entity";
import { ScheduleType } from "src/entity/types";
import { ArgsType, Field, registerEnumType } from "type-graphql";

registerEnumType(ScheduleType, {
  name: "ScheduleType",
});
@ArgsType()
export class AcademicYearScheduleArgs implements Partial<AcademicYearSchedule> {
  @Field(() => ScheduleType)
  type: ScheduleType;

  @Field(() => String)
  academicYearId: string;
}
