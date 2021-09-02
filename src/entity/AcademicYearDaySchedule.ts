import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicYear } from "./AcademicYear";
import { dayOfWeek } from "./types/classIncur";

@ObjectType()
@Entity("academic_year_day_schedule")
export class AcademicYearDaySchedule extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  num_of_day: number;

  @Column()
  start_day: number;

  @Column("text")
  repeatDay: dayOfWeek;

  @ManyToOne(
    () => AcademicYear,
    (academicYear) => academicYear.academicYearDaySchedules
  )
  academicYear: AcademicYear;
}
