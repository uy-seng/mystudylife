import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DayOfWeek } from "../types";
import { ClassSchedule } from "..";
import { Field, ObjectType } from "type-graphql";

@Entity("class_repeat_schedule")
@ObjectType()
export class RepeatSchedule {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column("time")
  @Field(() => String)
  startTime: string;

  @Column("time")
  @Field(() => String)
  endTime: string;

  @Column("int", { array: true })
  @Field(() => [DayOfWeek])
  repeatDays: DayOfWeek[];

  @Column("date", { nullable: true })
  @Field(() => String, { nullable: true })
  startDate: string;

  @Column("date", { nullable: true })
  @Field(() => String, { nullable: true })
  endDate: string;

  @Column("uuid")
  scheduleId: string;

  @OneToOne(() => ClassSchedule, (schedule) => schedule.repeat)
  @JoinColumn({ name: "scheduleId", referencedColumnName: "id" })
  schedule: ClassSchedule;
}
