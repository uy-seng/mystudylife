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
  start_date: string;

  @Field(() => String)
  end_date: string;

  @Field(() => String)
  schedulingType: academicYearSchedulingType;

  @Field(() => [TaskObjectType], { nullable: true, defaultValue: [] })
  tasks: TaskObjectType[];

  @Field(() => [SubjectObjectType], { nullable: true, defaultValue: [] })
  subjects: SubjectObjectType[];

  @Field(() => [ClassObjectType], { nullable: true, defaultValue: [] })
  classes: ClassObjectType[];

  @Field(() => [AcademicYearWeekRotationScheduleObjectType], {
    nullable: true,
    defaultValue: [],
  })
  weekRotationSchedules: AcademicYearWeekRotationScheduleObjectType[];

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
  start_date: string;

  @Field(() => String)
  end_date: string;

  @Field(() => String)
  schedulingType: academicYearSchedulingType;

  @Field(() => [AcademicYearWeekRotationScheduleInputType], { nullable: true })
  weekRotationSchedules: AcademicYearWeekRotationScheduleInputType[];

  @Field(() => [AcademicYearDayRotationScheduleInputType], { nullable: true })
  dayRotationSchedules: AcademicYearDayRotationScheduleInputType[];

  @Field(() => [AcademicYearTermInputType], { defaultValue: [] })
  terms: AcademicYearTermInputType[];
}
