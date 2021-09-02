import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";
import { dateTransformer, timeTransformer } from "../helper/date.utils";
import { User } from "./User";

@ObjectType()
@Entity("exam")
export class Exam extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  resit: boolean;

  @Column()
  module: string;

  @Column({
    transformer: dateTransformer,
  })
  date: Date;

  @Column({
    transformer: timeTransformer,
  })
  start_time: Date;

  @Column({
    transformer: timeTransformer,
  })
  end_time: Date;

  @Column()
  seat: string;

  @Column()
  room: string;

  @OneToMany(() => Task, (task) => task.exam)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.exams)
  user: User;
}
