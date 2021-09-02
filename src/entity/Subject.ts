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

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.subject)
  tasks: Task[];

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.subjects)
  academicYear: AcademicYear;

  @ManyToOne(
    () => AcademicYearTerm,
    (academicYearTerm) => academicYearTerm.subjects
  )
  academicYearTerm: AcademicYearTerm;

  @ManyToOne(() => User, (user) => user.subjects)
  user: User;

  @OneToOne(() => Class, (_class) => _class.subject)
  class: Class;
}
