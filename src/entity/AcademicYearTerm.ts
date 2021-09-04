import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Class } from "./Class";
import { Subject } from "./Subject";
import { Task } from "./Task";
import { AcademicYear } from "./AcademicYear";

@ObjectType()
@Entity("academic_year_term")
export class AcademicYearTerm extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column("date")
  start_date: string;
  @Column("date")
  end_date: string;

  @Field(() => [Task])
  @OneToMany(() => Task, (task) => task.term)
  tasks: Task[];

  @Field(() => [Subject])
  @OneToMany(() => Subject, (subject) => subject.term)
  subjects: Subject[];

  @Field(() => [Class])
  @OneToMany(() => Class, (_class) => _class.term)
  classes: Class[];

  @Field(() => AcademicYear)
  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.terms)
  academicYear: AcademicYear;
}
