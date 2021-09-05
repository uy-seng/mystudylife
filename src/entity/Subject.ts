import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "./Task";
import { AcademicYear } from "./AcademicYear";
import { AcademicYearTerm } from "./AcademicYearTerm";
import { User } from "./User";
import { Class } from "./Class";

@Entity("subjects")
export class Subject extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.subject)
  tasks: Task[];

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.subjects)
  academicYear: AcademicYear;

  @ManyToOne(() => AcademicYearTerm, (term) => term.subjects)
  term: AcademicYearTerm;

  @ManyToOne(() => User, (user) => user.subjects)
  user: User;

  @OneToOne(() => Class, (_class) => _class.subject)
  class: Class;
}
