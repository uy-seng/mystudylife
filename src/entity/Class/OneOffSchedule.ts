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
  start_time: string;

  @Column("time")
  @Field(() => String)
  end_time: string;

  @Column({ nullable: true })
  scheduleId: string;

  @OneToOne(() => ClassSchedule)
  @JoinColumn({ name: "scheduleId" })
  schedule: ClassSchedule;
}
