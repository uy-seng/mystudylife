import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { taskType } from "./types/task";
import { dateTransformer } from "../helper/date.utils";
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

  @Field(() => Date)
  @Column({
    transformer: dateTransformer,
  })
  due_date: Date;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  detail: string;

  @ManyToOne(() => Subject, (subject) => subject.tasks)
  subject: Subject;

  @ManyToOne(() => Exam, (exam) => exam.tasks)
  exam: Exam;

  @ManyToOne(() => AcademicYear, (exam) => exam.tasks)
  academicYear: AcademicYear;

  @ManyToOne(() => AcademicYearTerm, (exam) => exam.tasks)
  academicYearTerm: AcademicYearTerm;

  @ManyToOne(() => User, (exam) => exam.tasks)
  user: User;
}
