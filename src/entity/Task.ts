import { Field, ObjectType } from "type-graphql";
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

@ObjectType()
@Entity("task")
export class Task extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column("text")
  type: taskType;

  @Field(() => String)
  @Column("date")
  due_date: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  detail: string;

  @Field(() => Subject)
  @ManyToOne(() => Subject, (subject) => subject.tasks)
  subject: Subject;

  @Field(() => Exam)
  @ManyToOne(() => Exam, (exam) => exam.tasks)
  exam: Exam;

  @Field(() => AcademicYear)
  @ManyToOne(() => AcademicYear, (exam) => exam.tasks)
  academicYear: AcademicYear;

  @Field(() => AcademicYearTerm)
  @ManyToOne(() => AcademicYearTerm, (exam) => exam.tasks)
  term: AcademicYearTerm;

  @Field(() => User)
  @ManyToOne(() => User, (exam) => exam.tasks)
  user: User;
}
