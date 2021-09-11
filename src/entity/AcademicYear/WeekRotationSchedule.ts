import { Field, Int } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicYearSchedule } from "..";

@Entity("academic_year_week_rotation_schedules")
export class WeekRotationSchedule {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  numOfWeek: number;

  @Column()
  @Field(() => Int)
  startWeek: number;

  @Column({ nullable: true })
  scheduleId: string;

  @OneToOne(() => AcademicYearSchedule)
  @JoinColumn({ name: "scheduleId" })
  schedule: AcademicYearSchedule;
}
