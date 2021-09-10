import { Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  // @Query(() => [AcademicYearObjectType])
  // @UseMiddleware(authenticationGate)
  // async getCurrentUserAcademicYears(@Ctx() { user }: Context) {
  //   const q: User = (await User.findOne({
  //     where: {
  //       id: user?.id,
  //     },
  //     relations: ["academicYears"],
  //   })) as User;
  //   return q.academicYears;
  // }
}
