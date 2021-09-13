import { AcademicYearSchedule } from "src/entity";
import { AcademicYearScheduleType } from "src/entity/types";
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
