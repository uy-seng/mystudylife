import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

  /**
   * Field Resolver here to get schedule info
   *  */

  @OneToOne(() => OneOffSchedule)
  oneOff: OneOffSchedule;

  @OneToOne(() => RepeatSchedule)
  repeat: RepeatSchedule;

  @OneToOne(() => Class)
  class: Class;
}
