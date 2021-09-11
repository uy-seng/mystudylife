import { CookieOptions } from "express";
import { graphql } from "graphql";
import {
  AuthResolver,
  AcademicYearResolver,
  AcademicYearScheduleResolver,
  TermResolver,
} from "src/graphql/resolvers";
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
    [key]: value,
  });
};

export const testClient = async ({
  source,
  variableValues,
  headers,
}: Options) => {
  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      AcademicYearResolver,
      AcademicYearScheduleResolver,
      TermResolver,
    ],
  });

  return graphql({
    schema: schema,
    source: source,
    variableValues: variableValues,
    contextValue: {
      req: {
        headers: headers,
        cookies: cookies,
      },
      res: {
        cookie: cookie,
      },
    },
  });
};
