import { ObjectType, InputType, Field } from "type-graphql";
import {
  AcademicYearObjectType,
  AcademicYearTermObjectType,
  ClassIncurObjectType,
  SubjectObjectType,
  UserObjectType,
} from ".";

@ObjectType()
export class ClassObjectType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  module: string;

  @Field(() => String)
  room: string;

  @Field(() => String)
  building: string;

  @Field(() => String)
  teacher: string;

  @Field(() => [ClassIncurObjectType])
  classIncurs: ClassIncurObjectType[];

  @Field(() => SubjectObjectType)
  subject: SubjectObjectType;

  @Field(() => AcademicYearObjectType)
  academicYear: AcademicYearObjectType;

  @Field(() => AcademicYearTermObjectType)
  term: AcademicYearTermObjectType;

  @Field(() => UserObjectType)
  user: UserObjectType;
}

@InputType()
export class ClassInputType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  module: string;

  @Field(() => String)
  room: string;

  @Field(() => String)
  building: string;

  @Field(() => String)
  teacher: string;
}
