import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AcademicYear } from ".";
import { dayOfWeek } from "./types";

@Entity("academic_year_day_rotation_schedules")
export class AcademicYearDayRotationSchedule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  numOfDay: number;

  @Column()
  startDay: number;

  @Column("int")
  repeatDay: dayOfWeek;

  @ManyToOne(
    () => AcademicYear,
    (academicYear) => academicYear.dayRotationSchedules
  )
  academicYear: AcademicYear;
}
