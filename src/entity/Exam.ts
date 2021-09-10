import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task, User } from ".";

@Entity("exams")
export class Exam {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  resit: boolean;

  @Column()
  module: string;

  @Column("date")
  date: string;

  @Column("time")
  start_time: string;

  @Column("time")
  end_time: string;

  @Column()
  seat: string;

  @Column()
  room: string;

  @OneToMany(() => Task, (task) => task.exam)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.exams)
  user: User;
}
