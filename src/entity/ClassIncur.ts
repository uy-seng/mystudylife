import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { classIncurRepeatDayType, classIncurType } from "./types/classIncur";
import { Class } from "./Class";
import { dayOfWeek } from "./types";

@Entity("class_incurs")
export class ClassIncur extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  type: classIncurType;

  @Column("text")
  dayType: classIncurRepeatDayType;

  @Column("time")
  start_time: string;

  @Column("time")
  end_time: string;

  @Column("date")
  startDate: string;

  @Column("date")
  endDate: string;

  @Column("int")
  repeatDay: dayOfWeek;

  @ManyToOne(() => Class, (_class) => _class.classIncurs)
  class: Class;
}
