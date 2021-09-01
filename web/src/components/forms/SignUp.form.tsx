import React, { useEffect, useState } from "react";
import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { FormikTextInput } from "../input";
import { Button } from "../button";
import { useRegisterMutation } from "../../generated/graphql";
import { ApolloError } from "@apollo/client";

export const SignUpForm: React.FC<{}> = () => {
  const [error, setError] = useState<string>("");
  const [register] = useRegisterMutation();
  useEffect(() => {
    if (error) {
      // empty error message
      const ERROR_TIMEOUT = 3 * 1000; // 3 seconds
      setTimeout(() => {
        setError("");
      }, ERROR_TIMEOUT);
    }
  }, [error]);

  return (
    <div>
      {error && <span className="error">{error}</span>}
      <Formik
        initialValues={initialValues}
        validationSchema={FormValuesValidationSchema}
        onSubmit={async (values: FormValues) => {
          try {
            await register({
              variables: {
                registerEmail: values.email,
                registerPassword: values.password,
                registerUsername: values.username,
              },
            });
          } catch (error) {
            const e = error as ApolloError;
            if (e.message.includes("username"))
              setError("Username already exist");
            else if (e.message.includes("email"))
              setError("Email already exist");
          }
        }}
      >
        {InnerForm}
      </Formik>
    </div>
  );
};

const FormValuesValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const InnerForm: React.FC<FormikProps<FormValues>> = (props) => {
  const { touched, errors } = props;
  return (
    <Form>
      <div>
        <FormikTextInput
          style={{ color: "black" }}
          name="username"
          label="Username"
        />
        {touched.username && errors.username && (
          <span className="error">{errors.username}</span>
        )}
      </div>
      <div>
        <FormikTextInput
          style={{ color: "black" }}
          name="email"
          label="Email"
        />

        {touched.email && errors.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>
      <div>
        <FormikTextInput
          style={{ color: "black" }}
          name="password"
          label="Password"
        />

        {touched.password && errors.password && (
          <span className="error">{errors.password}</span>
        )}
      </div>
      <div>
        <FormikTextInput
          style={{ color: "black" }}
          name="confirmPassword"
          label="Confirm Password"
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
      </div>
      <div className="txt-sm">
        by creating an account you agree to our{" "}
        <a className="txt-primary" href="/">
          privacy policy
        </a>{" "}
        and{" "}
        <a className="txt-primary" href="/">
          {" "}
          terms of service
        </a>
      </div>
      <Button as="submit" type="primary" text="Confirm" />
    </Form>
  );
};

const initialValues: FormValues = {
  email: "",
  password: "",
  username: "",
  confirmPassword: "",
};

/**
 * interfaces
 */
interface FormValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
