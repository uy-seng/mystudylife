import { AcademicYearSchedule } from "src/entity";
import { ScheduleType } from "src/entity/types";
import { Field } from "type-graphql";

export class AcademicYearScheduleInput
  implements Partial<AcademicYearSchedule>
{
  @Field(() => ScheduleType)
  type: ScheduleType;

  @Field(() => String)
  academicYearId: string;
}
