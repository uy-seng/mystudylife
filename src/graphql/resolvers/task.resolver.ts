import { Task } from "src/entity/Task";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => String)
  createTask() {
    return "you are authenticated";
  }
}
