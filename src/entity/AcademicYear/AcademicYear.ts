import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Task, Subject, Class, User, Term, AcademicYearSchedule } from "..";

@Entity("academic_years")
@ObjectType()
export class AcademicYear {
  // manually store uuid v4
  @PrimaryColumn("uuid")
  @Field(() => String)
  id: string;

  @Column("date")
  @Field(() => String)
  startDate: string;

  @Column("date")
  @Field(() => String)
  endDate: string;

  @OneToMany(() => Term, (term) => term.academicYear)
  @Field(() => Term)
  terms: Term[];

  @OneToOne(() => AcademicYearSchedule)
  @JoinColumn()
  @Field(() => AcademicYearSchedule)
  schedule: AcademicYearSchedule;

  @OneToMany(() => Subject, (subject) => subject.academicYear)
  @Field(() => [Subject])
  subjects: Subject[];

  @OneToMany(() => Class, (_class) => _class.academicYear)
  @Field(() => [Class])
  classes: Class[];

  @ManyToOne(() => Task, (task) => task.academicYear)
  tasks: Task[];

  @ManyToOne(() => User, (user) => user.academicYears, { eager: true })
  user: User;
}
