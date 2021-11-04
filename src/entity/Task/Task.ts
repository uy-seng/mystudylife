import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Subject, Exam, AcademicYear, Term, User } from "..";
import { TaskType } from "../types";
import { Field, ObjectType } from "type-graphql";

@Entity("tasks", {
  orderBy: {
    createdAt: "ASC",
  },
})
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

  @CreateDateColumn({ default: () => "NOW()" })
  createdAt: Date;

  @ManyToOne(() => Subject, (subject) => subject.tasks)
  @Field(() => Subject)
  subject: Subject;

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.tasks)
  @Field(() => AcademicYear, { nullable: true })
  academicYear: AcademicYear;

  @ManyToOne(() => Exam, (exam) => exam.tasks)
  exam: Exam;

  @ManyToOne(() => Term, (term) => term.tasks)
  term: Term;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
