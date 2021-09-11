import { Subject, Task, User } from "..";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

@Entity("exams")
@ObjectType()
export class Exam {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Boolean)
  resit: boolean;

  @Column()
  @Field(() => String)
  module: string;

  @Column("date")
  @Field(() => String)
  date: string;

  @Column("time")
  @Field(() => String)
  start_time: string;

  @Column("time")
  @Field(() => String)
  end_time: string;

  @Column()
  @Field(() => String)
  seat: string;

  @Column()
  @Field(() => String)
  room: string;

  @OneToOne(() => Subject)
  @JoinColumn()
  @Field(() => Subject)
  subject: Subject;

  @OneToMany(() => Task, (task) => task.exam)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.exams)
  user: User;
}
