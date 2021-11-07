import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import bcrypt from "bcryptjs";
import { AuthenticationError, ValidationError } from "apollo-server-errors";
import { getConnection, QueryFailedError } from "typeorm";
import { LoginResponse } from "./types/auth";
import { User } from "../../../entity";
import {
  createAccessToken,
  sendRefreshToken,
  createRefreshToken,
} from "src/helper";
import { authenticationGate } from "src/middleware";
import { Context } from "src/interface";

@Resolver()
export class AuthResolver {
  @Mutation(() => Boolean, { nullable: true })
  async register(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      const userRepository = await getConnection(
        process.env.NODE_ENV
      ).getRepository(User);
      const user = userRepository.create({
        email: email,
        username: username,
        password: hashedPassword,
      });
      await userRepository.save(user);
      return true;
    } catch (e) {
      switch (e.constructor) {
        case QueryFailedError:
          if (e.code === "23505")
            return new ValidationError("email or username already exist");
          else return e;
        default:
          console.log(e);
          return e;
      }
    }
  }
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ) {
    const userRepository = await getConnection(
      process.env.NODE_ENV
    ).getRepository(User);
    const user = await userRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!user) return new AuthenticationError("invalid credentials");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new AuthenticationError("invalid credentails");

    // payload to be sent to client side
    const userPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      tokenVersion: user.tokenVersion,
    };
    const response: LoginResponse = {
      accessToken: createAccessToken(userPayload),
    };

    sendRefreshToken(res, createRefreshToken(userPayload));
    return response;
  }

  @Query(() => User)
  @UseMiddleware(authenticationGate)
  me(@Ctx() { user }: Context): User {
    return user as User;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(authenticationGate)
  async logout(@Ctx() { res }: Context): Promise<boolean> {
    sendRefreshToken(res, "");
    return true;
  }
}
