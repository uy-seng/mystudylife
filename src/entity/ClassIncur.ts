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

@Entity("class_incurs")
export class ClassIncur extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  type: classIncurType;

  @Column("time")
  start_time: string;

  @Column("time")
  end_time: string;

  @Column("date")
  start_date: string;

  @Column("date")
  end_date: string;

  @Column("int")
  repeatDay: dayOfWeek;

  @ManyToOne(() => Class, (_class) => _class.classIncurs)
  class: Class;
}
