import { AcademicYearSchedule } from "src/entity";
import { ScheduleType } from "src/entity/types";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class AcademicYearScheduleArgs implements Partial<AcademicYearSchedule> {
  @Field(() => String)
  type: ScheduleType;

  @Field(() => String)
  academicYearId: string;
}
