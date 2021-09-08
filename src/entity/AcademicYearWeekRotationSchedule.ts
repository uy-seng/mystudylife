import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("academic_year_week_rotation_schedules")
export class AcademicYearWeekRotationSchedule extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  numOfWeek: number;

  @Column()
  startWeek: number;
}
