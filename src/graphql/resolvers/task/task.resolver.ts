import { AcademicYear, Subject, Task, User } from "src/entity";
import { Context } from "src/interface";
import { authenticationGate } from "src/middleware";
import {
  Arg,
  Args,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { TaskArgs, UpdateTaskArgs } from "./types";
import { ValidationError } from "apollo-server-errors";
import { ApolloError } from "apollo-server-errors";
import { TaskType } from "src/entity/types";

@Resolver()
export class TaskResolver {
  private readonly taskRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(Task);
  private readonly subjectRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(Subject);
  private readonly userRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(User);
  private readonly academicYearRepository = getConnection(
    process.env.NODE_ENV
  ).getRepository(AcademicYear);

  @Mutation(() => Task)
  @UseMiddleware(authenticationGate)
  async newTask(
    @Args()
  { subjectId, due_date, detail, title, type, academicYearId }: TaskArgs,
    @Ctx() { user }: Context
  ) {
    const newTask = this.taskRepository.create({
      title: title,
      due_date: due_date,
      detail: detail,
      type: type,
      completed: 0
    });

    const subject = await this.subjectRepository.findOne(subjectId);
    if (!subject) throw new ValidationError("invalid subject id");
    newTask.subject = subject;

    if (academicYearId) {
      const academicYear = await this.academicYearRepository.findOne(
        academicYearId
      );
      if (!academicYear) throw new ValidationError("invalid academic year id");
      newTask.academicYear = academicYear;
    }

    const qUser = (await this.userRepository.findOne(user!.id)) as User;
    newTask.user = qUser;

    return await this.taskRepository.save(newTask);
  }

  @Query(() => [Task])
  @UseMiddleware(authenticationGate)
  async getTasks(@Ctx() { user }: Context) {
    const tasks = await this.taskRepository.find({
      relations: ["user", "subject", "academicYear"],
      where: {
        user: {
          id: user!.id,
        },
      },
    });

    return tasks.filter(task => task.completed !== 100);
  }

  @Query(() => Task)
  @UseMiddleware(authenticationGate)
  async getTaskById(
    @Arg("id", () => String) id: string,
    @Ctx() { user }: Context
  ) {
    const q = await this.taskRepository.findOne(id, {
      relations: ["academicYear", "user", "subject"],
      where: {
        user: {
          id: user!.id,
        },
      },
    });
    if (!q || q.user.id !== user!.id) throw new ApolloError("result not found");
    return q;
  }

  @Query(() => [Task])
  @UseMiddleware(authenticationGate)
  async getTasksByDate(
    @Arg("date", () => Date) date: Date,
    @Ctx() { user }: Context
  ) {
    const tasks = await this.taskRepository.find({
      relations: ["user", "academicYear", "subject"],
      where: {
        user: {
          id: user!.id,
        },
      },
    });

    return tasks.filter(
      (c) =>
        +new Date(c.due_date) === +new Date(date.toISOString().split("T")[0])
    );
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticationGate)
  async deleteTask(
    @Arg("id", () => String) id: string,
    @Ctx() { user }: Context
  ) {
    const c = await this.taskRepository.findOne(id, {
      relations: ["user"],
      where: {
        user: user!.id,
      },
    });
    if (!c)
      throw new ValidationError(
        "class not found for this user, please check id again"
      );
    await this.taskRepository.remove(c);
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticationGate)
  async updateTask(
    @Args() updateContext: UpdateTaskArgs,
    @Ctx() { user }: Context
  ) {
    const q = await this.taskRepository.findOne(updateContext.id, {
      relations: ["user", "subject", "academicYear"],
    });
    const updatedSubject = await this.subjectRepository.findOne(
      updateContext.subjectId
    );

    const updatedAcademicYear = updateContext.academicYearId? await this.academicYearRepository.findOne(
      updateContext.academicYearId
    ): null;
   
    if (!q || q.user.id !== user!.id || (updateContext.subjectId && !updatedSubject) || (updateContext.academicYearId && !updatedAcademicYear))
      throw new ValidationError("item not found. please provide a valid id");

    q.detail = updateContext.detail as string;
    q.due_date = updateContext.due_date as string;
    q.title = updateContext.title as string;
    q.type = updateContext.type as TaskType;
    if(updatedAcademicYear) q.academicYear = updatedAcademicYear;
    if(updatedSubject) q.subject = updatedSubject;

    if(updateContext.completed) {
   
      q.completed = updateContext.completed as number;
    }

    await this.taskRepository.save(q);

    return true;
  }
}
