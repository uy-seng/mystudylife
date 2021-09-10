import { academicYearSchedulingType } from "src/entity/types";
import { ArgsType, Field, InputType, ObjectType } from "type-graphql";
import {
  AcademicYearWeekRotationScheduleObjectType,
  AcademicYearDayRotationScheduleObjectType,
  AcademicYearTermObjectType,
  AcademicYearWeekRotationScheduleInputType,
  AcademicYearDayRotationScheduleInputType,
  AcademicYearTermInputType,
} from ".";
import { ClassObjectType } from "../../class/types";
import { SubjectObjectType } from "../../subject/types";
import { TaskObjectType } from "../../task/types";
import { UserObjectType } from "../../user/types";

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

@ArgsType()
export class createNewAcademicYearArgs {
  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  @Field(() => academicYearSchedulingType)
  schedulingType: academicYearSchedulingType;

  @Field(() => [AcademicYearTermInputType], { nullable: true })
  terms?: AcademicYearTermInputType[];

  @Field(() => AcademicYearWeekRotationScheduleInputType, { nullable: true })
  weekRotationSchedule?: AcademicYearWeekRotationScheduleInputType;

  @Field(() => AcademicYearDayRotationScheduleInputType, { nullable: true })
  dayRotationSchedule?: AcademicYearDayRotationScheduleInputType;
}
