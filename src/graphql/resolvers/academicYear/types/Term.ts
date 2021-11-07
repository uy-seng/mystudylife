import { Term } from "../../../../entity";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class TermArgs implements Partial<Term> {
  @Field(() => String)
  name: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  @Field(() => String)
  academicYearId: string;
}
