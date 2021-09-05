import { authenticationGate } from "../../middleware/auth.middleware";
import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../../interface/index.d";
import { AcademicYearObjectType } from "../types";
import { User } from "../../entity/User";

@Resolver()
export class UserResolver {
  @Query(() => String)
  @UseMiddleware(authenticationGate)
  me(@Ctx() { user }: Context) {
    return user?.id;
  }

  @Query(() => [AcademicYearObjectType])
  @UseMiddleware(authenticationGate)
  async getCurrentUserAcademicYears(@Ctx() { user }: Context) {
    const q: User = (await User.findOne({
      where: {
        id: user?.id,
      },
      relations: ["academicYears"],
    })) as User;
    return q.academicYears;
  }
}
