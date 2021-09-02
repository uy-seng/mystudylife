import React from "react";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillGoogleCircle,
} from "react-icons/ai";
import { Button, LinkButton, SocialMediaButton } from "../button";
import { Divider } from "../divider";
import { SignInForm } from "../forms";
import { useAppDispatch } from "../../app/hooks";
import { changeSignInMode } from "../../shared/Guest.slice";
import css from "../../pages/Guest.module.css";

interface SignInComponents {
  Email: React.FC;
  SocialMedia: React.FC;
}
interface SignInProps {}

export const SignIn: React.FC<SignInProps> & SignInComponents = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

const Email: React.FC = () => {
  return (
    <div>
      <SignInForm className={css.content} />
      <div></div>
    </div>
  );
};

const SocialMedia: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={css.content}>
      <div className={css.section}>
        <SocialMediaButton
          to="/"
          style={{
            background: "#3b5998",
            color: "white",
          }}
          icon={<AiFillFacebook />}
          text={"Continue with Facebook"}
        />
        <SocialMediaButton
          to="/"
          style={{
            background: "#cc3732",
            color: "white",
          }}
          icon={<AiFillGoogleCircle />}
          text={"Continue with Google"}
        />
        <SocialMediaButton
          to="/"
          style={{
            background: "black",
            color: "white",
          }}
          icon={<AiFillGithub />}
          text={"Continue with Github"}
        />
      </div>
      <div className={css.section}>
        <Divider label="or" />
      </div>
      <div className={css.section}>
        <Button
          onClick={() => dispatch(changeSignInMode("email"))}
          as="secondary"
          text="Sign in with email"
        />
        <LinkButton
          style={{
            border: "2px solid var(--secondary)",
            height: "100%",
          }}
          as="primary"
          to="/sign-up"
          text="Sign Up"
        />
      </div>
      <div style={{ textAlign: "center" }} className={css.section}>
        <div className="txt-xs txt-secondary">
          <span>by continuing you agree to our </span>
          <a className="txt-xs txt-secondary" href="/">
            privacy policy
          </a>
          <span> and </span>
          <a className="txt-xs txt-secondary" href="/">
            term of service
          </a>
        </div>
      </div>
    </div>
  );
};

SignIn.Email = Email;
SignIn.SocialMedia = SocialMedia;
