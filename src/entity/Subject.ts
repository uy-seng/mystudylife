import { Field, ObjectType } from "type-graphql";
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

@ObjectType()
@Entity("subject")
export class Subject extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [Task])
  @OneToMany(() => Task, (task) => task.subject)
  tasks: Task[];

  @Field(() => AcademicYear)
  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.subjects)
  academicYear: AcademicYear;

  @Field(() => AcademicYearTerm)
  @ManyToOne(() => AcademicYearTerm, (term) => term.subjects)
  term: AcademicYearTerm;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.subjects)
  user: User;

  @Field(() => Class)
  @OneToOne(() => Class, (_class) => _class.subject)
  class: Class;
}
