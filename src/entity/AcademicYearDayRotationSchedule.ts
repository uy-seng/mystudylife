import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicYear } from "./AcademicYear";
import { dayOfWeek } from "./types/index";

@Entity("academic_year_day_rotation_schedules")
export class AcademicYearDayRotationSchedule extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  num_of_day: number;

  @Column()
  start_day: number;

  @Column("int")
  repeatDay: dayOfWeek;

  @ManyToOne(
    () => AcademicYear,
    (academicYear) => academicYear.dayRotationSchedules
  )
  academicYear: AcademicYear;
}
