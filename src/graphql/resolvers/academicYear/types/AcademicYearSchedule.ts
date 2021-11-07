import { AcademicYearSchedule } from "../../../../entity";
import { AcademicYearScheduleType } from "../../../../entity/types";
import { ArgsType, Field, registerEnumType } from "type-graphql";

registerEnumType(AcademicYearScheduleType, {
  name: "AcademicYearScheduleType",
});
@ArgsType()
export class AcademicYearScheduleArgs implements Partial<AcademicYearSchedule> {
  @Field(() => AcademicYearScheduleType)
  type: AcademicYearScheduleType;

  @Field(() => String)
  academicYearId: string;
}
