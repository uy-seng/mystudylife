import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task, AcademicYear, Term, User, Class } from "..";
import { Field, ObjectType } from "type-graphql";

@Entity("subjects")
@ObjectType()
export class Subject {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @OneToMany(() => Task, (task) => task.subject)
  tasks: Task[];

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.subjects)
  @Field(() => AcademicYear, { nullable: true })
  academicYear: AcademicYear;

  @ManyToOne(() => Term, (term) => term.subjects)
  term: Term;

  @ManyToOne(() => User, (user) => user.subjects)
  user: User;

  @OneToOne(() => Class, (_class) => _class.subject)
  class: Class;
}
