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
  start_time: string;

  @Column("time")
  @Field(() => String)
  end_time: string;

  @Column("int", { array: true })
  @Field(() => [DayOfWeek])
  repeatDays: DayOfWeek[];

  @Column("date", { nullable: true })
  @Field(() => String, { nullable: true })
  startDate: string;

  @Column("date", { nullable: true })
  @Field(() => String, { nullable: true })
  endDate: string;

  @Column({ nullable: true })
  scheduleId: string;

  @OneToOne(() => ClassSchedule)
  @JoinColumn({ name: "scheduleId" })
  schedule: ClassSchedule;
}
