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
  selectAcademicYearSchedulePayload,
  selectDayRotationPayload,
  selectWeekRotationPayload,
  selectCreateTermComponentState,
  WeekRotationPayload,
  DayRotationPayload,
  AcademicYearSchedulePayload,
} from "../../../shared/NewAcademicYear.slice";
import { Pair } from "../../../types";
import { isValidDateFormat, getMonthName } from "../../../utils";
import { Button, LoaderButton } from "../../button";
import { FormikDatepicker } from "../../input";
import { NewTerm } from "../../modal";
import { Scheduling } from "./Scheduling";
import { CgDanger } from "react-icons/cg";

import css from "./EditAcademicYear.module.css";
import {
  NewAcademicYearMutationFn,
  NewAcademicYearScheduleMutationFn,
  NewPartialDayRotationMutationFn,
  NewPartialWeekRotationMutationFn,
  NewTermMutationFn,
  useNewAcademicYearMutation,
  useNewAcademicYearScheduleMutation,
  useNewPartialDayRotationMutation,
  useNewPartialWeekRotationMutation,
  useNewTermMutation,
} from "../../../generated/graphql";
import { selectScheduleComponentState } from "../../../shared/Schedule.slice";

const InnerForm = (props: FormikProps<AcademicYearPayload>) => {
  const { errors, isSubmitting } = props;
  const { id, startDate, endDate } = useAppSelector(
    selectScheduleComponentState
  ).selectedYear!;
  const [activeTab, setActiveTab] = React.useState("scheduling");

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
              //   rerender={refreshCounter}
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
              //   rerender={refreshCounter}
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
              onClick={(_e) => {
                if (activeTab !== "term") setActiveTab("term");
              }}
              className={activeTab === "term" ? css.active : undefined}
            >
              Terms
            </div>
          </div>
          <div className={css.tabContent}>
            {/* {activeTab === "scheduling" && <Scheduling />}
            {activeTab === "term" && <NewTerm />} */}
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
        <LoaderButton
          style={{
            padding: isSubmitting ? "0.7rem 2rem" : "1rem 2rem",
          }}
          loading={isSubmitting}
          disabled={isSubmitting}
          as="primary"
          type="submit"
          text="Save"
        />
      </div>
    </Form>
  );
};

// The type of props MyForm receives

// Wrap our form with the withFormik HoC
const MyForm = withFormik<any, AcademicYearPayload>({
  handleSubmit: (_values, { props, setSubmitting }) => {
    console.log(props);
  },
  enableReinitialize: true,
})(InnerForm);

export const EditAcademicYearForm: React.FC<{}> = () => {
  //   const [newAcademicYear] = useNewAcademicYearMutation();
  //   const [newAcademicYearSchedule] = useNewAcademicYearScheduleMutation();
  //   const [newPartialDayRotation] = useNewPartialDayRotationMutation();
  //   const [newPartialWeekRotation] = useNewPartialWeekRotationMutation();
  //   const [newTerm] = useNewTermMutation();

  //   const academicYearPayload = useAppSelector(selectAcademicYearPayload);
  //   const academicYearSchedulePayload = useAppSelector(
  //     selectAcademicYearSchedulePayload
  //   );
  //   const dayRotationPayload = useAppSelector(selectDayRotationPayload);
  //   const weekRotationPayload = useAppSelector(selectWeekRotationPayload);
  //   const terms = useAppSelector(selectCreateTermComponentState).terms;

  return (
    <MyForm
    //   newAcademicYear={newAcademicYear}
    //   newAcademicYearSchedule={newAcademicYearSchedule}
    //   newPartialDayRotation={newPartialDayRotation}
    //   newPartialWeekRotation={newPartialWeekRotation}
    //   newTerm={newTerm}
    //   academicYearPayload={academicYearPayload}
    //   academicYearSchedulePayload={academicYearSchedulePayload}
    //   dayRotationPayload={dayRotationPayload}
    //   weekRotationPayload={weekRotationPayload}
    //   terms={terms}
    //   setShow={setShow}
    />
  );
};
