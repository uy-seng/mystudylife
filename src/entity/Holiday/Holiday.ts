import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { AcademicYear, User } from "..";

@Entity("holidays")
@ObjectType()
export class Holiday {
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

  @ManyToOne(() => AcademicYear, (academicYear) => academicYear.holidays)
  academicYear: AcademicYear;

  @ManyToOne(() => User, (user) => user.holidays)
  user: User;
}
