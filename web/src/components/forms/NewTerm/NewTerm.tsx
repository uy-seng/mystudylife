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

import css from "./NewTerm.module.css";

const InnerForm = (props: FormikProps<TermPayload> & DispatchMap) => {
  const { touched, errors, setTermPayload } = props;
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

  const validateStartDate = (value: string) => {
    const date = new Date();
    if (!isValidDateFormat(value))
      return `Invalid date. Must be in format ${getMonthName(
        date.getMonth()
      )} ${date.getDate()} ${date.getFullYear()}. MM DD YYYY`;
    if (new Date(startDate) >= new Date(endDate))
      return "Invalid start date. (Start date must occur before end date)";
    return null;
  };

  const validateEndDate = (value: string) => {
    const date = new Date();
    if (!isValidDateFormat(value))
      return `Invalid date. Must be in format ${getMonthName(
        date.getMonth()
      )} ${date.getDate()} ${date.getFullYear()}. MM DD YYYY`;
    if (new Date(endDate) <= new Date(startDate))
      return "Invalid end date. (End date must occur after start date)";
    return null;
  };

  return (
    <Form>
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
              placeholder="eg. Winter Term, Spring Quarter"
              label="Name"
            />
            {touched.name && errors.name && (
              <div className="error">{errors.name}</div>
            )}
          </div>
        </div>
      </div>
      <div className={css.group}>
        <div className={css.field}>
          <div className="flex">
            <FormikDatepicker
              name="startDate"
              validate={validateStartDate}
              dateHandler={(value) => {
                setTermPayload({
                  key: "startDate",
                  value: value,
                });
              }}
              label="Start Date"
            />
            {errors.startDate && (
              <div className="tooltip">
                <CgDanger />
                <span className="tooltip-text">{errors.startDate}</span>
              </div>
            )}
          </div>
        </div>
        <div className={css.field}>
          <div className="flex">
            <FormikDatepicker
              name="endDate"
              validate={validateEndDate}
              dateHandler={(value) => {
                setTermPayload({
                  key: "endDate",
                  value: value,
                });
              }}
              label="End Date"
            />
            {errors.endDate && (
              <div className="tooltip">
                <CgDanger />
                <span className="tooltip-text">{errors.endDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <Button
          type="submit"
          style={{
            padding: "0.5rem",
          }}
          text="Save"
          as="primary"
        />
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

export const NewTermForm = connect(mapStateToProps, mapDispatchToProps)(MyForm);
