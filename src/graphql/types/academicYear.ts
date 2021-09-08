import { Field, InputType, ObjectType } from "type-graphql";
import { academicYearSchedulingType } from "../../entity/types/academicYear";
import { AcademicYearWeekRotationScheduleInputType } from "./academicYearWeekRotationSchedule";
import { AcademicYearDayRotationScheduleInputType } from "./academicYearDayRotationSchedule";
import {
  AcademicYearDayRotationScheduleObjectType,
  AcademicYearTermInputType,
  AcademicYearTermObjectType,
  AcademicYearWeekRotationScheduleObjectType,
  UserObjectType,
  TaskObjectType,
  SubjectObjectType,
  ClassObjectType,
} from ".";

@ObjectType()
export class AcademicYearObjectType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  @Field(() => String)
  schedulingType: academicYearSchedulingType;

  @Field(() => [TaskObjectType], { nullable: true, defaultValue: [] })
  tasks: TaskObjectType[];

  @Field(() => [SubjectObjectType], { nullable: true, defaultValue: [] })
  subjects: SubjectObjectType[];

  @Field(() => [ClassObjectType], { nullable: true, defaultValue: [] })
  classes: ClassObjectType[];

  @Field(() => AcademicYearWeekRotationScheduleObjectType, {
    nullable: true,
    defaultValue: [],
  })
  weekRotationSchedule: AcademicYearWeekRotationScheduleObjectType;

  @Field(() => [AcademicYearDayRotationScheduleObjectType], {
    nullable: true,
    defaultValue: [],
  })
  dayRotationSchedules: AcademicYearDayRotationScheduleObjectType[];

  @Field(() => [AcademicYearTermObjectType], {
    nullable: true,
    defaultValue: [],
  })
  terms: AcademicYearTermObjectType[];

  @Field(() => UserObjectType)
  user: UserObjectType;
}

@InputType()
export class AcademicYearInputType {
  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  @Field(() => String)
  schedulingType: academicYearSchedulingType;

  @Field(() => AcademicYearWeekRotationScheduleInputType, { nullable: true })
  weekRotationSchedule: AcademicYearWeekRotationScheduleInputType;

  @Field(() => [AcademicYearDayRotationScheduleInputType], { nullable: true })
  dayRotationSchedules: AcademicYearDayRotationScheduleInputType;

  @Field(() => [AcademicYearTermInputType], { nullable: true })
  terms: AcademicYearTermInputType[];
}
