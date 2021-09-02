import React from "react";
import logo from "../assets/msl-logo-circle.svg";
import css from "./Guest.module.css";
import { useSelector } from "react-redux";
import { selectSignInMode } from "../shared/Guest.slice";
import { SignIn } from "../components/signin";

interface Props {}

export const Guest: React.FC<Props> = () => {
  const signInMode = useSelector(selectSignInMode);
  return (
    <div className={css.page}>
      <div className={css.logo}>
        <img src={logo} alt="" />
      </div>
      <div className={css.body}>
        <SignIn>
          {signInMode === "email" && <SignIn.Email />}
          {signInMode === "social" && <SignIn.SocialMedia />}
        </SignIn>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className="txt-sm txt-white">
          New to My Study Life?{" "}
          <a className="txt-white txt-bold" href="/">
            Find out more
          </a>
        </div>
      </div>
    </div>
  );
};
