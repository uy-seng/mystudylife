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

@Entity("academic_year_terms")
export class AcademicYearTerm extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("date")
  start_date: string;

  @Column("date")
  end_date: string;

  @OneToMany(() => Task, (task) => task.term, { nullable: true })
  tasks: Task[];

  @OneToMany(() => Subject, (subject) => subject.term, { nullable: true })
  subjects: Subject[];

  @OneToMany(() => Class, (_class) => _class.term, { nullable: true })
  classes: Class[];

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.terms)
  academicYear: AcademicYear;
}
