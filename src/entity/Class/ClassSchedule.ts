import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RepeatSchedule, OneOffSchedule, Class } from "..";
import { Field, ObjectType } from "type-graphql";
import { ClassScheduleType } from "../types";

@Entity("class_schedules")
@ObjectType()
export class ClassSchedule {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column("text")
  @Field(() => String)
  type: ClassScheduleType;

  @OneToOne(() => OneOffSchedule, (oneoff) => oneoff.schedule)
  @Field(() => OneOffSchedule, { nullable: true })
  oneOff: OneOffSchedule;

  @OneToOne(() => RepeatSchedule, (repeat) => repeat.schedule)
  @Field(() => RepeatSchedule, { nullable: true })
  repeat: RepeatSchedule;

  @Column("uuid")
  classId: string;

  @OneToOne(() => Class)
  @JoinColumn({ name: "classId", referencedColumnName: "id" })
  class: Class;
}
