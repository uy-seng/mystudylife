import { ObjectType, InputType, Field } from "type-graphql";
import { ClassIncurObjectType } from ".";
import {
  AcademicYearObjectType,
  AcademicYearTermObjectType,
} from "../../academicYear/types";
import { SubjectObjectType } from "../../subject/types";
import { UserObjectType } from "../../user/types";

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
