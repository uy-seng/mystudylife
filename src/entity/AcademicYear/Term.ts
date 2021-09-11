import { Field } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task, Subject, Class, AcademicYear } from "..";

@Entity("academic_year_terms")
export class Term {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column("date")
  @Field(() => String)
  startDate: string;

  @Column("date")
  @Field(() => String)
  endDate: string;

  @OneToMany(() => Task, (task) => task.term)
  tasks: Task[];

  @OneToMany(() => Subject, (subject) => subject.term)
  subjects: Subject[];

  @OneToMany(() => Class, (_class) => _class.term)
  classes: Class[];

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.terms)
  academicYear: AcademicYear;
}
