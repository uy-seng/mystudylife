import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicYear } from "./AcademicYear";

@ObjectType()
@Entity("academic_year_week_schedule")
export class AcademicYearWeekSchedule extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  num_of_week: number;

  @Column()
  start_week: number;

  @OneToOne(
    () => AcademicYear,
    (academicYear) => academicYear.academicYearWeekSchedule
  )
  academicYear: AcademicYear;
}
