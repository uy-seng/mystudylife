import React from "react";
import logo from "../assets/msl-logo-circle.svg";
import {
  Button,
  IconButton,
  LinkButton,
  SocialMediaButton,
} from "../components/button";
import {
  AiFillFacebook,
  AiFillGoogleCircle,
  AiFillGithub,
  AiFillCaretLeft,
} from "react-icons/ai";
import css from "./Guest.module.css";
import { Divider } from "../components/divider";
import { TextInput } from "../components/input/TextInput";

interface Props {}

export const Guest: React.FC<Props> = () => {
  const [signInWithEmail, setSignInWithEmail] = React.useState<boolean>(false);
  let body: React.ReactNode = null;
  if (signInWithEmail) {
    body = (
      <div className={css.content}>
        <form className={css.form}>
          <div>
            <TextInput label="Email" />
          </div>
          <div>
            <TextInput label="Password" />
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <IconButton
              onClick={() => setSignInWithEmail(false)}
              as="button"
              style={{
                background: "none",
                width: "fit-content",
                padding: "0",
                marginRight: "184px",
                color: "white",
              }}
              icon={<AiFillCaretLeft />}
              text="Back"
            />
            <Button text="Sign in" type="secondary" />
          </div>
        </form>
        <div></div>
      </div>
    );
  } else {
    body = (
      <div className={css.content}>
        <div className={css.section}>
          <SocialMediaButton
            style={{
              background: "#3b5998",
              color: "white",
            }}
            icon={<AiFillFacebook />}
            text={"Continue with Facebook"}
          />
          <SocialMediaButton
            style={{
              background: "#cc3732",
              color: "white",
            }}
            icon={<AiFillGoogleCircle />}
            text={"Continue with Google"}
          />
          <SocialMediaButton
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
        <div
          style={{
            flexDirection: "row",
            flex: "0.1",
          }}
          className={css.section}
        >
          <Button
            onClick={(_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              setSignInWithEmail(true)
            }
            style={{
              marginRight: "1rem",
            }}
            type="secondary"
            text="Sign in with email"
          />
          <LinkButton href="/sign-up" text="Sign Up" />
        </div>
        <div className={css.section}>
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
  }

  return (
    <div className={css.page}>
      <div className={css.content}>
        <div className={css.logo}>
          <img src={logo} alt="" />
        </div>
        <div className={css.body}>{body}</div>
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
    </div>
  );
};
