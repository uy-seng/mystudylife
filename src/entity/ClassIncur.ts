import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { classIncurType } from "./types/classIncur";
import { Class } from "./Class";
import { dayOfWeek } from "./types";

@ObjectType()
@Entity("class_incur")
export class ClassIncur extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column("text")
  type: classIncurType;

  @Field(() => String)
  @Column("time")
  start_time: string;

  @Field(() => String)
  @Column("time")
  end_time: string;

  @Field(() => String)
  @Column("date")
  start_date: string;

  @Field(() => String)
  @Column("date")
  end_date: string;

  @Field(() => String)
  @Column("text")
  repeatDay: dayOfWeek;

  @Field(() => Class)
  @ManyToOne(() => Class, (_class) => _class.classIncurs)
  class: Class;
}
