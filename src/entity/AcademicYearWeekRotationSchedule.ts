import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicYear } from "./AcademicYear";

@Entity("academic_year_week_rotation_schedules")
export class AcademicYearWeekRotationSchedule extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  num_of_week: number;

  @Column()
  start_week: number;

  @OneToOne(
    () => AcademicYear,
    (academicYear) => academicYear.weekRotationSchedules
  )
  academicYear: AcademicYear;
}
