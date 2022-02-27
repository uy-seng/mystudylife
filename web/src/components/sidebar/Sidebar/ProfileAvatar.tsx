import React from "react";
import css from "./ProfileAvatar.module.css";

interface Props {
  userNameInitial: string;
}

export const ProfileAvatar: React.FC<Props> = ({ userNameInitial }) => {
  return <div className={css.wrapper}>{userNameInitial}</div>;
};
