import { authenticationGate } from "../../middleware/auth.middleware";
import { Query, Resolver, UseMiddleware } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => String)
  @UseMiddleware(authenticationGate)
  me() {
    return "you are authenticated";
  }
}
