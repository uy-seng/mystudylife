import { Field, InputType, ObjectType } from "type-graphql";
import { AcademicYearObjectType } from ".";
import { ClassObjectType } from "../../class/types";
import { SubjectObjectType } from "../../subject/types";
import { TaskObjectType } from "../../task/types";

@ObjectType()
export class AcademicYearTermObjectType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  @Field(() => [TaskObjectType], { defaultValue: [] })
  tasks: TaskObjectType[];

  @Field(() => [SubjectObjectType], { defaultValue: [] })
  subjects: SubjectObjectType[];

  @Field(() => [ClassObjectType], { defaultValue: [] })
  classes: ClassObjectType[];

  @Field(() => AcademicYearObjectType)
  academicYear: AcademicYearObjectType;
}

@InputType()
export class AcademicYearTermInputType {
  @Field(() => String)
  name: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;
}
