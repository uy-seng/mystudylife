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
import { dateTransformer } from "../helper/date.utils";

@ObjectType()
@Entity("academic_year_term")
export class AcademicYearTerm extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({
    transformer: dateTransformer,
  })
  start_date: Date;

  @Column({
    transformer: dateTransformer,
  })
  end_date: Date;

  @OneToMany(() => Task, (task) => task.academicYearTerm)
  tasks: Task[];

  @OneToMany(() => Subject, (subject) => subject.academicYearTerm)
  subjects: Subject[];

  @OneToMany(() => Class, (_class) => _class.academicYearTerm)
  classes: Class[];

  @ManyToOne(
    () => AcademicYear,
    (academicYear) => academicYear.academicYearTerms
  )
  academicYear: AcademicYear;
}
