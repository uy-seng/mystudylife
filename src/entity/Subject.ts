import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task, AcademicYear, AcademicYearTerm, User, Class } from ".";

@Entity("subjects")
export class Subject {
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
