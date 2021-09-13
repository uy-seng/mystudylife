import { AcademicYear } from "src/entity";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class AcademicYearArgs implements Partial<AcademicYear> {
  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;
}
