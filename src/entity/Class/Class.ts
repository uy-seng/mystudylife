import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
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

  @OneToOne(() => Subject, (subject) => subject.class)
  @JoinColumn()
  @Field(() => Subject)
  subject: Subject;

  @OneToOne(() => ClassSchedule, (classSchedule) => classSchedule.class)
  @JoinColumn()
  @Field(() => ClassSchedule)
  schedule: ClassSchedule;

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.classes)
  academicYear: AcademicYear;

  @ManyToOne(() => Term, (term) => term.classes)
  term: Term;

  @ManyToOne(() => User, (user) => user.classes)
  user: User;
}
