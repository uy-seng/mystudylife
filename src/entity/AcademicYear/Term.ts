import { Field, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task, Subject, Class, AcademicYear } from "..";

@Entity("academic_year_terms")
@ObjectType()
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

  @Column("uuid")
  academicYearId: string;

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.terms, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "academicYearId", referencedColumnName: "id" })
  academicYear: AcademicYear;
}
