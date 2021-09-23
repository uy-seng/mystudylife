import React, { useEffect, useState } from "react";
import { Formik, FormikProps, Form } from "formik";
import { FormikTextInput } from "../../input";
import { IconButton } from "../../button";
import { ApolloError } from "@apollo/client";
import { LoaderButton } from "../../button/LoaderButton/LoaderButton";
import { AiFillCaretLeft } from "react-icons/ai";
import { useLoginMutation } from "../../../generated/graphql";
import { useHistory } from "react-router";
import { useAppDispatch } from "../../../app/hooks";
import { changeSignInMode } from "../../../shared/Guest.slice";

import css from "../../../pages/Guest.module.css";
import { getAccessToken, setAccessToken } from "../../../auth";

export const SignInForm: React.FC<React.AllHTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const [error, setError] = useState<string>("");
  const [login] = useLoginMutation();
  const history = useHistory();
  useEffect(() => {
    if (error) {
      // reset error message
      const ERROR_TIMEOUT = 3 * 1000; // 3 seconds
      setTimeout(() => {
        setError("");
      }, ERROR_TIMEOUT);
    }
  }, [error]);

  return (
    <div {...props}>
      {error && <span className="error">{error}</span>}
      <Formik
        initialValues={initialValues}
        onSubmit={async (values: FormValues) => {
          try {
            /**
             * function here
             */
            const response = await login({
              variables: {
                loginEmail: values.email,
                loginPassword: values.password,
              },
            });
            setAccessToken(response.data!.login.accessToken);
            window.location.reload();
          } catch (error) {
            /**
             * error handling here
             */
            const e = error as ApolloError;
            console.log(e.message);
            setError("Invalid Login Credentials");
          }
        }}
      >
        {InnerForm}
      </Formik>
    </div>
  );
};

const InnerForm: React.FC<FormikProps<FormValues>> = (props) => {
  const { isSubmitting } = props;
  const dispatch = useAppDispatch();
  return (
    <Form className={css.form}>
      <div>
        <FormikTextInput
          autoFocus
          style={{ color: "white" }}
          name="email"
          label="Email"
        />
      </div>
      <div>
        <FormikTextInput
          style={{ color: "white" }}
          name="password"
          label="Password"
          type="password"
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "3rem",
        }}
      >
        <IconButton
          type="button"
          onClick={() => dispatch(changeSignInMode("social"))}
          style={{
            background: "none",
            width: "fit-content",
            padding: "0",
            color: "white",
          }}
          icon={<AiFillCaretLeft />}
          text="Back"
        />
        <LoaderButton
          disabled={isSubmitting}
          loading={isSubmitting}
          as="secondary"
          text={"Sign In"}
        />
      </div>
    </Form>
  );
};

const initialValues: FormValues = {
  email: "",
  password: "",
};

/**
 * interfaces
 */
interface FormValues {
  email: string;
  password: string;
}
