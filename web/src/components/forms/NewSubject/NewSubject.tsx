import React from "react";
import { withFormik, FormikProps, Form } from "formik";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import {
  TermPayload,
  selectCreateTermComponentState,
  setTermPayload,
} from "../../../shared/NewAcademicYear.slice";

import { Pair } from "../../../types";
import { isValidDateFormat, getMonthName } from "../../../utils";
import { Button } from "../../button";
import { FormikBasicTextInput, FormikDatepicker } from "../../input";
import { CgDanger } from "react-icons/cg";

import css from "./NewSubject.module.css";
const InnerForm = (props: FormikProps<TermPayload> & DispatchMap) => {
  const { touched, errors, setTermPayload } = props;
  const [advanceMenu, setAdvanceMenu] = React.useState<boolean>(false);
  const { startDate, endDate } = useAppSelector(
    selectCreateTermComponentState
  ).payload;

  React.useLayoutEffect(() => {
    if (touched.name && errors.name) {
      document.querySelector(`.${css.name}`)?.classList.add(css.error);
    } else {
      document.querySelector(`.${css.name}`)?.classList.remove(css.error);
    }
  }, [touched.name, errors.name]);

  const validateName = (value: string) => {
    if (value.length === 0) return "Required";
    return null;
  };

  return (
    <Form className={css.form}>
      <div className={css.field}>
        <div className={css.group}>
          <div>
            <FormikBasicTextInput
              className={css.name}
              name="name"
              validate={validateName}
              onChange={(e) => {
                setTermPayload({
                  key: "name",
                  value: e.target.value,
                });
              }}
              label="Name"
            />
            {touched.name && errors.name && (
              <div className="error">{errors.name}</div>
            )}
          </div>
        </div>
      </div>
      <div className={css.group}>
        <span className={css.advanced + " txt-sm"}>Advanced</span>
      </div>
      <div className={css.group}>
        <div className="txt-md">What are Subjects?</div>
        <div className="txt-sm">
          Subjects are also known as courses and enable you to group all of your
          classes, tasks and exams for that course.
        </div>
      </div>
      <div className={css.btns}>
        <Button type="submit" text="Save" as="primary" />
      </div>
    </Form>
  );
};

// The type of props MyForm receives

// Wrap our form with the withFormik HoC
const MyForm = withFormik<any, TermPayload>({
  handleSubmit: (values, { props }) => {
    // do submitting things
    console.log(props);
  },
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      name: props.name,
      startDate: props.startDate,
      endDate: props.endDate,
    };
  },
})(InnerForm);

const mapStateToProps = (state: RootState) => {
  return state.newacademicyear.createTermComponentState.payload;
};

interface DispatchMap {
  setTermPayload: (params: Pair<TermPayload>) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchMap => ({
  setTermPayload: (params: Pair<TermPayload>) => {
    dispatch(setTermPayload(params));
  },
});

export const NewSubjectForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyForm);
