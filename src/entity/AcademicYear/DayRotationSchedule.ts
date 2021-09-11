import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicYearSchedule } from "..";
import { DayOfWeek } from "../types";

@Entity("academic_year_day_rotation_schedules")
@ObjectType()
export class DayRotationSchedule {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  numOfDay: number;

  @Column()
  @Field(() => Int)
  startDay: number;

  @Column("int", { array: true })
  @Field(() => [Int])
  repeatDays: DayOfWeek[];

  @Column({ nullable: true })
  scheduleId: string;

  @OneToOne(() => AcademicYearSchedule)
  @JoinColumn({ name: "scheduleId" })
  schedule: AcademicYearSchedule;
}
