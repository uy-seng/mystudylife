import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Task, Exam, Subject, Class, AcademicYear, UserProvider } from "..";

@Entity("users")
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  username: string;

  @Column({ unique: true, nullable: true })
  @Field(() => String, { nullable: true })
  email: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  password: string;

  @OneToOne(() => UserProvider)
  @JoinColumn()
  @Field(() => UserProvider)
  provider: UserProvider;

  @Column({ default: 0 })
  @Field(() => Int)
  tokenVersion: number;

  @OneToMany(() => Task, (task) => task.user, { onDelete: "CASCADE" })
  tasks: Task[];

  @OneToMany(() => Exam, (exam) => exam.user, { onDelete: "CASCADE" })
  exams: Exam[];

  @OneToMany(() => Subject, (subject) => subject.user, { onDelete: "CASCADE" })
  subjects: Subject[];

  @OneToMany(() => Class, (_class) => _class.user, { onDelete: "CASCADE" })
  classes: Class[];

  @OneToMany(() => AcademicYear, (academicYear) => academicYear.user, {
    onDelete: "CASCADE",
  })
  academicYears: AcademicYear[];
}
