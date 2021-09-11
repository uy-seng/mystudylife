import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Subject, Exam, AcademicYear, Term, User } from "..";
import { TaskType } from "../types";
import { Field, ObjectType } from "type-graphql";

@Entity("tasks")
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column("text")
  @Field(() => String)
  type: TaskType;

  @Column("date")
  @Field(() => String)
  due_date: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  detail: string;

  @ManyToOne(() => Subject, (subject) => subject.tasks)
  @Field(() => Subject)
  subject: Subject;

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.tasks)
  academicYear: AcademicYear;

  @ManyToOne(() => Exam, (exam) => exam.tasks)
  exam: Exam;

  @ManyToOne(() => Term, (term) => term.tasks)
  term: Term;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
