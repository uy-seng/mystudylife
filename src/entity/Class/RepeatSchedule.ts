import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DayOfWeek } from "../types";
import { ClassSchedule } from "..";
import { Field, Int, ObjectType } from "type-graphql";

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

  @Column("int", { nullable: true })
  @Field(() => Int, { nullable: true })
  rotationWeek: number;

  @Column("uuid")
  scheduleId: string;

  @ManyToOne(() => ClassSchedule, (schedule) => schedule.repeat, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "scheduleId", referencedColumnName: "id" })
  schedule: ClassSchedule;
}
