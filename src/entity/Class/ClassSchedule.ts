import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClassScheduleType } from "../types/ClassSchedule";
import { RepeatSchedule, OneOffSchedule, Class } from "..";
import { Field, ObjectType } from "type-graphql";

@Entity("class_schedules")
@ObjectType()
export class ClassSchedule {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column("text")
  @Field(() => String)
  type: ClassScheduleType;

  @OneToOne(() => OneOffSchedule)
  oneOff: OneOffSchedule;

  @OneToOne(() => RepeatSchedule)
  repeat: RepeatSchedule;

  @Column("uuid")
  classId: string;

  @OneToOne(() => Class)
  @JoinColumn({ name: "classId", referencedColumnName: "id" })
  class: Class;
}
