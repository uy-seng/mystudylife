import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { MeQuery, useMeQuery } from "../generated/graphql";

interface Props extends RouteProps {
  data: MeQuery | undefined;
}

export const PrivateRoute: React.FC<Props> = ({
  component,
  path,
  exact,
  data,
}) => {
  if (!data) return <Redirect to="/" />;

  return <Route exact={exact} path={path} component={component} />;
};
