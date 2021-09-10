import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task, Subject, Class, AcademicYear } from ".";

@Entity("academic_year_terms")
export class AcademicYearTerm {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("date")
  startDate: string;

  @Column("date")
  endDate: string;

  @OneToMany(() => Task, (task) => task.term, { nullable: true })
  tasks: Task[];

  @OneToMany(() => Subject, (subject) => subject.term, { nullable: true })
  subjects: Subject[];

  @OneToMany(() => Class, (_class) => _class.term, { nullable: true })
  classes: Class[];

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.terms)
  academicYear: AcademicYear;
}
