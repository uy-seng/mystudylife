import { Holiday } from "../../../../entity";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class HolidayArgs implements Partial<Holiday> {
  @Field(() => String)
  academicYearId: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;
}

@ArgsType()
export class UpdateHolidayArgs extends HolidayArgs {
  @Field(() => String)
  id: string;
}
