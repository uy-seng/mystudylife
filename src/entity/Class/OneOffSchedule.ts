import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClassSchedule } from "..";

@Entity("class_one_off_schedule")
@ObjectType()
export class OneOffSchedule {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column("date")
  @Field(() => String)
  date: string;

  @Column("time")
  @Field(() => String)
  startTime: string;

  @Column("time")
  @Field(() => String)
  endTime: string;

  @Column("uuid")
  scheduleId: string;

  @OneToOne(() => ClassSchedule, (schedule) => schedule.oneOff)
  @JoinColumn({ name: "scheduleId", referencedColumnName: "id" })
  schedule: ClassSchedule;
}
