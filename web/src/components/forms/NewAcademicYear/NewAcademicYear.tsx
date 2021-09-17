import React from "react";
import { withFormik, FormikProps, Form } from "formik";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import {
  AcademicYearPayload,
  selectAcademicYearPayload,
  selectAcademicYearComponentRefreshCounter,
  setAcademicYearPayload,
} from "../../../shared/NewAcademicYear.slice";
import { Pair } from "../../../types";
import { isValidDateFormat, getMonthName } from "../../../utils";
import { Button } from "../../button";
import { FormikDatepicker } from "../../input";
import { NewTerm } from "../../modal";
import { Scheduling } from "./Scheduling";
import { CgDanger } from "react-icons/cg";

import css from "./NewAcademicYear.module.css";
const InnerForm = (props: FormikProps<AcademicYearPayload> & DispatchMap) => {
  const { errors, setAcademicYearPayload } = props;
  const { startDate, endDate } = useAppSelector(selectAcademicYearPayload);
  const refreshCounter = useAppSelector(
    selectAcademicYearComponentRefreshCounter
  );
  const [activeTab, setActiveTab] = React.useState<string>("scheduling");

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
      <div>
        <div className={css.wrapper}>
          <div className={css.field}>
            <FormikDatepicker
              name="startDate"
              validate={validateStartDate}
              dateHandler={(value) => {
                setAcademicYearPayload({
                  key: "startDate",
                  value: value,
                });
              }}
              defaultValue={startDate}
              rerender={refreshCounter}
              label="Start Date"
            />
            {errors.startDate && (
              <div className="tooltip">
                <CgDanger />
                <span className="tooltip-text">{errors.startDate}</span>
              </div>
            )}
          </div>
          <div className={css.field}>
            <FormikDatepicker
              name="endDate"
              validate={validateEndDate}
              dateHandler={(value) => {
                setAcademicYearPayload({
                  key: "endDate",
                  value: value,
                });
              }}
              defaultValue={endDate}
              rerender={refreshCounter}
              label="End Date"
            />
            {errors.startDate && (
              <div className="tooltip">
                <CgDanger />
                <span className="tooltip-text">{errors.startDate}</span>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            marginTop: "2rem",
          }}
        >
          <div className={css.tabs}>
            <div
              onClick={(e) => {
                if (activeTab !== "scheduling") setActiveTab("scheduling");
              }}
              className={activeTab === "scheduling" ? css.active : undefined}
            >
              Scheduling
            </div>
            <div
              onClick={(e) => {
                if (activeTab !== "term") setActiveTab("term");
              }}
              className={activeTab === "term" ? css.active : undefined}
            >
              Terms
            </div>
          </div>
          <div className={css.tabContent}>
            {activeTab === "scheduling" && <Scheduling />}
            {activeTab === "term" && <NewTerm />}
          </div>
        </div>
      </div>
      <div className={css.textGroup}>
        <div className="txt-md">What Are Academic Years?</div>
        <div
          className="txt-sm"
          style={{
            maxWidth: "500px",
          }}
        >
          An academic year and its terms are used to represent your school year
          and any terms (eg. semesters, trimesters, quarters) that you may have.
        </div>
      </div>
      <div className={css.actionBtnGroup}>
        <Button as="primary" type="submit" text="Save" />
      </div>
    </Form>
  );
};

// The type of props MyForm receives

// Wrap our form with the withFormik HoC
const MyForm = withFormik<any, AcademicYearPayload>({
  handleSubmit: (values, { props }) => {
    // do submitting things
    console.log(props);
  },
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      startDate: props.startDate,
      endDate: props.endDate,
    };
  },
})(InnerForm);

const mapStateToProps = (state: RootState) => {
  return state.newacademicyear.academicYearPayload;
};

interface DispatchMap {
  setAcademicYearPayload: (params: Pair<AcademicYearPayload>) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchMap => ({
  setAcademicYearPayload: (params: Pair<AcademicYearPayload>) => {
    dispatch(setAcademicYearPayload(params));
  },
});

export const NewAcademicYearForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyForm);
