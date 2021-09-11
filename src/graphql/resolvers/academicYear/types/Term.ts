import { Term } from "src/entity";
import { Field, InputType } from "type-graphql";

@InputType()
export class TermInput implements Partial<Term> {
  @Field(() => String)
  name: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  @Field(() => String)
  academicYearId: string;
}
