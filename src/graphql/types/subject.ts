import { Field, InputType, ObjectType } from "type-graphql";
import {
  AcademicYearObjectType,
  AcademicYearTermObjectType,
  ClassObjectType,
  TaskObjectType,
  UserObjectType,
} from ".";
import {
  Task,
  AcademicYear,
  AcademicYearTerm,
  User,
  Class,
} from "../../entity";

@ObjectType()
export class SubjectObjectType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [TaskObjectType])
  tasks: TaskObjectType[];

  @Field(() => AcademicYearObjectType)
  academicYear: AcademicYearObjectType;

  @Field(() => AcademicYearTermObjectType)
  term: AcademicYearTermObjectType;

  @Field(() => UserObjectType)
  user: UserObjectType;

  @Field(() => ClassObjectType)
  class: ClassObjectType;
}

@InputType()
export class SubjectInputType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [Task])
  tasks: Task[];

  @Field(() => AcademicYear)
  academicYear: AcademicYear;

  @Field(() => AcademicYearTerm)
  term: AcademicYearTerm;

  @Field(() => User)
  user: User;

  @Field(() => Class)
  class: Class;
}
