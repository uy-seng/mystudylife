import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
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
  @Field(() => ClassScheduleType)
  type: ClassScheduleType;

  @OneToOne(() => OneOffSchedule, (oneoff) => oneoff.schedule)
  @Field(() => OneOffSchedule, { nullable: true })
  oneOff: OneOffSchedule;

  @OneToMany(() => RepeatSchedule, (repeat) => repeat.schedule)
  @Field(() => [RepeatSchedule], { nullable: true })
  repeat: [RepeatSchedule];

  @Column("uuid")
  classId: string;

  @OneToOne(() => Class, { onDelete: "CASCADE" })
  @JoinColumn({ name: "classId", referencedColumnName: "id" })
  class: Class;
}
