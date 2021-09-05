import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Class } from "./Class";
import { Exam } from "./Exam";
import { Subject } from "./Subject";
import { Task } from "./Task";
import { AcademicYear } from "./AcademicYear";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  provider: string;

  @Column({ nullable: true })
  providerId: string;

  @Column({ default: 0 })
  tokenVersion: number;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Exam, (exam) => exam.user)
  exams: Exam[];

  @OneToMany(() => Subject, (subject) => subject.user)
  subjects: Subject[];

  @OneToMany(() => Class, (_class) => _class.user)
  classes: Class[];

  @OneToMany(() => AcademicYear, (academicYear) => academicYear.user, {
    cascade: true,
  })
  academicYears: AcademicYear[];
}
