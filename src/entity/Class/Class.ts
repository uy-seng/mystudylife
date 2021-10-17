import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Subject, AcademicYear, Term, User, ClassSchedule } from "..";

@Entity("classes")
@ObjectType()
export class Class {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  module: string;

  @Column()
  @Field(() => String)
  room: string;

  @Column()
  @Field(() => String)
  building: string;

  @Column()
  @Field(() => String)
  teacher: string;

  @ManyToOne(() => Subject, (subject) => subject.classes)
  @Field(() => Subject)
  subject: Subject;

  @OneToOne(() => ClassSchedule, (classSchedule) => classSchedule.class)
  @Field(() => ClassSchedule)
  schedule: ClassSchedule;

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.classes)
  academicYear: AcademicYear;

  @ManyToOne(() => Term, (term) => term.classes)
  term: Term;

  @ManyToOne(() => User, (user) => user.classes)
  @Field(() => User)
  user: User;
}
