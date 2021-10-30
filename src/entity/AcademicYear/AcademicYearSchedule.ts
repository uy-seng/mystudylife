import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicYear, DayRotationSchedule, WeekRotationSchedule } from "..";
import { AcademicYearScheduleType } from "../types";

@ObjectType()
@Entity("academic_year_schedules")
export class AcademicYearSchedule {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column("text")
  @Field(() => AcademicYearScheduleType)
  type: AcademicYearScheduleType;

  /**
   * Field Resolver here to get schedule info
   *  */

  @OneToOne(
    () => DayRotationSchedule,
    (dayRotationSchedule) => dayRotationSchedule.schedule
  )
  @Field(() => DayRotationSchedule, { nullable: true })
  dayRotation: DayRotationSchedule;

  @OneToOne(
    () => WeekRotationSchedule,
    (weekRotationSchedule) => weekRotationSchedule.schedule
  )
  @Field(() => WeekRotationSchedule, { nullable: true })
  weekRotation: WeekRotationSchedule;

  @Column("uuid")
  academicYearId: string;

  @OneToOne(() => AcademicYear, (academicYear) => academicYear.schedule, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "academicYearId", referencedColumnName: "id" })
  academicYear: AcademicYear;
}
