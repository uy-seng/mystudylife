import { User } from "../../entity/User";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { AuthenticationError, ValidationError } from "apollo-server-errors";
import { Context } from "../../interface";
import {
  sendRefreshToken,
  createAccessToken,
  createRefreshToken,
} from "../../helper/auth.utils";
import { LoginResponse, UserObjectType } from "../types";

@Resolver()
export class AuthResolver {
  @Query(() => [UserObjectType])
  users() {
    return User.find();
  }

  @Mutation(() => UserObjectType)
  async register(
    @Arg("username") username: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      const user = await User.create({
        email: email,
        username: username,
        password: hashedPassword,
      });
      await user.save();
      return user;
    } catch (e) {
      return new ValidationError(e.detail);
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: Context
  ) {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) return new AuthenticationError("invalid credentials");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new AuthenticationError("invalid credentails");

    // payload to be sent to client side
    const userPayload: UserObjectType = {
      id: user.id,
      email: user.email,
      username: user.username,
      provider: user.provider,
      tokenVersion: user.tokenVersion,
    };

    const response: LoginResponse = {
      acesssToken: createAccessToken(userPayload),
      user: userPayload,
    };

    sendRefreshToken(res, createRefreshToken(userPayload));
    return response;
  }
}
