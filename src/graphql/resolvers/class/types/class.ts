import { Class } from "../../../../entity";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class ClassArgs implements Partial<Class> {
  @Field(() => String)
  subjectId: string;

  @Field(() => String, { defaultValue: "" })
  module?: string;

  @Field(() => String, { defaultValue: "" })
  room?: string;

  @Field(() => String, { defaultValue: "" })
  building?: string;

  @Field(() => String, { defaultValue: "" })
  teacher?: string;

  @Field(() => String, { nullable: true })
  academicYearId: string;
}

@ArgsType()
export class UpdateClassArgs extends ClassArgs {
  @Field(() => String)
  id: string;
}
