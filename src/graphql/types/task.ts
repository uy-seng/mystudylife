import { Field, InputType, ObjectType } from "type-graphql";
import {
  AcademicYearObjectType,
  AcademicYearTermObjectType,
  ExamObjectType,
  SubjectObjectType,
  UserObjectType,
} from ".";
import {
  Subject,
  Exam,
  AcademicYear,
  AcademicYearTerm,
  User,
} from "../../entity";
import { taskType } from "../../entity/types/task";

@ObjectType()
export class TaskObjectType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  type: taskType;

  @Field(() => String)
  due_date: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  detail: string;

  @Field(() => [SubjectObjectType])
  subject: SubjectObjectType;

  @Field(() => [ExamObjectType])
  exam: ExamObjectType;

  @Field(() => AcademicYearObjectType)
  academicYear: AcademicYearObjectType;

  @Field(() => AcademicYearTermObjectType)
  term: AcademicYearTermObjectType;

  @Field(() => UserObjectType)
  user: UserObjectType;
}

@InputType()
export class TaskInputType {
  @Field(() => String)
  id: string;

  @Field(() => taskType)
  type: taskType;

  @Field(() => String)
  due_date: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  detail: string;

  @Field(() => [Subject])
  subject: Subject;

  @Field(() => [Exam])
  exam: Exam;

  @Field(() => AcademicYear)
  academicYear: AcademicYear;

  @Field(() => AcademicYearTerm)
  term: AcademicYearTerm;

  @Field(() => User)
  user: User;
}
