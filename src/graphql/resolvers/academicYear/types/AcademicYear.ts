import { AcademicYear } from "src/entity";
import { Field, InputType } from "type-graphql";

@InputType()
export class AcademicYearInput implements Partial<AcademicYear> {
  @Field(() => String)
  id: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  @Field(() => String)
  scheduleId: string;

  @Field(() => String)
  termId?: string;
}
