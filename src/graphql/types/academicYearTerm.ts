import { Field, InputType, ObjectType } from "type-graphql";
import {
  AcademicYearObjectType,
  ClassObjectType,
  SubjectObjectType,
  TaskObjectType,
} from ".";

@ObjectType()
export class AcademicYearTermObjectType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  start_date: string;

  @Field(() => String)
  end_date: string;

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
  start_date: string;

  @Field(() => String)
  end_date: string;
}
