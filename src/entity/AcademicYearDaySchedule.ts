import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicYear } from "./AcademicYear";
import { dayOfWeek } from "./types/index";

@ObjectType()
@Entity("academic_year_day_schedule")
export class AcademicYearDaySchedule extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Number)
  @Column()
  num_of_day: number;

  @Field(() => Number)
  @Column()
  start_day: number;

  @Field(() => String)
  @Column("text")
  repeatDay: dayOfWeek;

  @Field(() => AcademicYear)
  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.dailySchedules)
  academicYear: AcademicYear;
}
