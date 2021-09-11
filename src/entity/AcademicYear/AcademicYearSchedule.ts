import { Field, ObjectType } from "type-graphql";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AcademicYear, DayRotationSchedule, WeekRotationSchedule } from "..";
import { ScheduleType } from "../types";

@ObjectType()
@Entity("academic_year_schedules")
export class AcademicYearSchedule {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text")
  type: ScheduleType;

  /**
   * Field Resolver here to get schedule info
   *  */

  @OneToOne(() => DayRotationSchedule)
  dayRotation: DayRotationSchedule;

  @OneToOne(() => WeekRotationSchedule)
  weekRotation: WeekRotationSchedule;

  @OneToOne(() => AcademicYear)
  academicYear: AcademicYear;
}
