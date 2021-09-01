import React from "react";
import css from "./SignUp.module.css";
import logo from "../assets/logo.svg";
import { SignUpForm } from "../components/forms";
import { Link } from "react-router-dom";
interface Props {}

export const SignUp: React.FC<Props> = () => {
  return (
    <div className={css.page}>
      <header className={css.header}>
        <Link to="/">
          <div className={css.logo}>
            <img src={logo} alt="" />
          </div>
        </Link>
      </header>
      <div className={css.content}>
        <div>
          <div className={css.info}>
            <div className={css.title}>Create your account</div>
            <div className={css.subtitle}>
              Organize your classes, assignments and exams for free
            </div>
          </div>
          <div className={css.form}>
            <SignUpForm />
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
