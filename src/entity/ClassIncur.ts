import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { dayOfWeek, classIncurType } from "./types/classIncur";
import { dateTransformer, timeTransformer } from "../helper/date.utils";
import { Class } from "./Class";

@ObjectType()
@Entity("class_incur")
export class ClassIncur extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  type: classIncurType;

  @Column({
    transformer: timeTransformer,
  })
  start_time: Date;

  @Column({
    transformer: timeTransformer,
  })
  end_time: Date;

  @Column({
    transformer: dateTransformer,
  })
  start_date: Date;

  @Column({
    transformer: dateTransformer,
  })
  end_date: Date;

  @Column("text")
  repeatDay: dayOfWeek;

  @ManyToOne(() => Class, (_class) => _class.classIncurs)
  class: Class;
}
