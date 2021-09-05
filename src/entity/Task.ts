import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { taskType } from "./types/task";
import { Subject } from "./Subject";
import { Exam } from "./Exam";
import { AcademicYear } from "./AcademicYear";
import { AcademicYearTerm } from "./AcademicYearTerm";
import { User } from "./User";

@Entity("tasks")
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  type: taskType;

  @Column("date")
  due_date: string;

  @Column()
  title: string;

  @Column()
  detail: string;

  @ManyToOne(() => Subject, (subject) => subject.tasks)
  subject: Subject;

  @ManyToOne(() => Exam, (exam) => exam.tasks)
  exam: Exam;

  @ManyToOne(() => AcademicYear, (exam) => exam.tasks)
  academicYear: AcademicYear;

  @ManyToOne(() => AcademicYearTerm, (exam) => exam.tasks)
  term: AcademicYearTerm;

  @ManyToOne(() => User, (exam) => exam.tasks)
  user: User;
}
