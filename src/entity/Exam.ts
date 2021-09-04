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
import { User } from "./User";

@ObjectType()
@Entity("exam")
export class Exam extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Boolean)
  @Column()
  resit: boolean;

  @Field(() => String)
  @Column()
  module: string;

  @Field(() => String)
  @Column("date")
  date: string;

  @Field(() => String)
  @Column("time")
  start_time: string;

  @Field(() => String)
  @Column("time")
  end_time: string;

  @Field(() => String)
  @Column()
  seat: string;

  @Field(() => String)
  @Column()
  room: string;

  @Field(() => [Task])
  @OneToMany(() => Task, (task) => task.exam)
  tasks: Task[];

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.exams)
  user: User;
}
