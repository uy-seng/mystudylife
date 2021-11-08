import React from "react";
import css from "./Setting.module.css";
import ctx from "classnames";
import { LoaderButton } from "../components/button";
import { useLogoutMutation } from "../generated/graphql";
import { useHistory } from "react-router-dom";
interface Props {}

export const Setting: React.FC<Props> = () => {
  const [logout, { loading }] = useLogoutMutation();
  const history = useHistory();
  return (
    <div>
      <div className={css.header}>
        <h1 className={ctx(css.title, " txt-lg")}>Setting</h1>
        <LoaderButton
          loading={loading}
          text="Log out"
          as="neutral"
          onClick={() => {
            logout().then(() => history.push("/"));
          }}
          style={{ maxWidth: "100px", margin: "0.5rem" }}
        />
      </div>
    </div>
  );
};
