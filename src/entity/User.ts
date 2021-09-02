import { Field, Int, ObjectType } from "type-graphql";
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

@ObjectType()
@Entity("user")
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column({ unique: true })
  username: string;

  @Field(() => String, { nullable: true })
  @Column({ unique: true, nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  password: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  provider: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  providerId: string;

  @Field(() => Int)
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

  @OneToMany(() => AcademicYear, (academicYear) => academicYear.user)
  academicYears: AcademicYear[];
}
