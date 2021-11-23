import { CookieOptions } from "express";
import { graphql } from "graphql";
import {
  AuthResolver,
  AcademicYearResolver,
  AcademicYearScheduleResolver,
  TermResolver,
  SubjectResolver
} from "src/graphql/resolvers";
import { ClassResolver } from "src/graphql/resolvers/class/class.resolver";
import { ClassScheduleResolver } from "src/graphql/resolvers/class/classSchedule.resolver";
import { OneOffScheduleResolver } from "src/graphql/resolvers/class/oneOffSchedule.resolver";
import { RepeatScheduleResolver } from "src/graphql/resolvers/class/repeatSchedule.resolver";
import { HolidayResolver } from "src/graphql/resolvers/holiday/holiday.resolver";
import { TaskResolver } from "src/graphql/resolvers/task/task.resolver";
import { buildSchema, Maybe } from "type-graphql";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  headers?: Maybe<{
    [key: string]: any;
  }>;
}

let cookies = {};

export const getCookies = () => {
  return cookies;
};

export const cookie = (key: string, value: string, options: CookieOptions) => {
  Object.assign(cookies, {
    ...cookies,
    [key]: value
  });
};

export const testClient = async ({
  source,
  variableValues,
  headers
}: Options) => {
  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      AcademicYearResolver,
      AcademicYearScheduleResolver,
      TermResolver,
      SubjectResolver,
      ClassResolver,
      ClassScheduleResolver,
      OneOffScheduleResolver,
      RepeatScheduleResolver,
      TaskResolver,
      HolidayResolver
    ]
  });

  return graphql({
    schema: schema,
    source: source,
    variableValues: variableValues,
    contextValue: {
      req: {
        headers: headers,
        cookies: cookies
      },
      res: {
        cookie: cookie
      }
    }
  });
};
