import { Field, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { AcademicYearSchedule } from "..";

@Entity("academic_year_week_rotation_schedules")
@ObjectType()
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

  @Column("uuid")
  scheduleId: string;

  @OneToOne(() => AcademicYearSchedule, (schedule) => schedule.weekRotation, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "scheduleId", referencedColumnName: "id" })
  schedule: AcademicYearSchedule;
}
