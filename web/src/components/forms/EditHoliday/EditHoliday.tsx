import React from "react";
import { withFormik, FormikProps, Form } from "formik";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
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
  TermPayload
} from "../../../shared/NewAcademicYear.slice";
import { Pair } from "../../../types";
import {
  isValidDateFormat,
  getMonthName,
  formatDate,
  asyncForEach
} from "../../../utils";
import { Button, LoaderButton } from "../../button";
import { FormikBasicTextInput, FormikDatepicker } from "../../input";
import { NewTerm } from "../../modal";
import { CgDanger } from "react-icons/cg";

import css from "./EditHoliday.module.css";
import {
  Exact,
  GetAcademicYearsQuery,
  NewAcademicYearMutationFn,
  NewAcademicYearScheduleMutationFn,
  NewHolidayMutationFn,
  NewPartialDayRotationMutationFn,
  NewPartialWeekRotationMutationFn,
  NewTermMutationFn,
  UpdateHolidayMutationFn,
  useGetAcademicYearsQuery,
  useNewAcademicYearMutation,
  useNewAcademicYearScheduleMutation,
  useNewHolidayMutation,
  useNewPartialDayRotationMutation,
  useNewPartialWeekRotationMutation,
  useNewTermMutation,
  useUpdateHolidayMutation
} from "../../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import {
  HolidayPayload,
  selectHolidayPayload,
  setHolidayPayload,
  setHolidayPayloadToDefault
} from "../../../shared/NewHoliday.slice";
import {
  selectToBeUpdatedHolidayPayload,
  setDefaultToBeUpdatedHolidayPayload,
  setToBeUpdatedHolidayPayload
} from "../../../shared/EditHoliday.slice";

const InnerForm = (props: FormikProps<HolidayPayload> & DispatchMap) => {
  const { errors, isSubmitting, setToBeUpdatedHolidayPayload, touched } = props;
  const { startDate, endDate, name } = useAppSelector(
    selectToBeUpdatedHolidayPayload
  ) as HolidayPayload & { id: string };

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
    if (new Date(startDate) > new Date(endDate))
      return "Invalid start date. (Start date must occur before end date)";
    return null;
  };

  const validateEndDate = (value: string) => {
    const date = new Date();
    if (!isValidDateFormat(value))
      return `Invalid date. Must be in format ${getMonthName(
        date.getMonth()
      )} ${date.getDate()} ${date.getFullYear()}. MM DD YYYY`;
    if (new Date(endDate) < new Date(startDate))
      return "Invalid end date. (End date must occur after start date)";
    return null;
  };

  return (
    <Form>
      <div>
        <div className={css.wrapper}>
          <div
            style={{
              marginTop: "0.5rem"
            }}
            className={css.field}
          >
            <FormikBasicTextInput
              className={css.name}
              value={name}
              name="name"
              validate={validateName}
              onChange={(e) => {
                setToBeUpdatedHolidayPayload({
                  key: "name",
                  value: e.target.value
                });
              }}
              placeholder="eg. Independence Day"
              label="Name"
            />
            {touched.name && errors.name && (
              <div className="error">{errors.name}</div>
            )}
          </div>
        </div>
        <div className={css.wrapper}>
          <div className={css.field}>
            <FormikDatepicker
              value={startDate}
              name="startDate"
              validate={validateStartDate}
              onChange={async (e) => {
                setToBeUpdatedHolidayPayload({
                  key: "startDate",
                  value: e.target.value
                });
              }}
              dateHandler={(value) => {
                setToBeUpdatedHolidayPayload({
                  key: "startDate",
                  value: value
                });
              }}
              defaultValue={startDate}
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
              value={endDate}
              name="endDate"
              onChange={async (e) => {
                setToBeUpdatedHolidayPayload({
                  key: "endDate",
                  value: e.target.value
                });
              }}
              validate={validateEndDate}
              dateHandler={(value) => {
                setToBeUpdatedHolidayPayload({
                  key: "endDate",
                  value: value
                });
              }}
              defaultValue={endDate}
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
      <div className={css.textGroup}>
        <div className="txt-md">What Are Holidays?</div>
        <div
          className="txt-sm"
          style={{
            maxWidth: "500px"
          }}
        >
          Holidays (also known as vacations or days off) enable you to specify
          dates on which you do not have classes.
        </div>
      </div>
      <div className={css.actionBtnGroup}>
        <LoaderButton
          style={{
            padding: isSubmitting ? "0.7rem 2rem" : "1rem 2rem"
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
const MyForm = withFormik<any, HolidayPayload>({
  handleSubmit: (_values, { props, setSubmitting }) => {
    const setShow = props.setShow as React.Dispatch<
      React.SetStateAction<boolean>
    >;
    const refetchAcademicYears = props.refetch as (
      variables?:
        | Partial<
            Exact<{
              [key: string]: never;
            }>
          >
        | undefined
    ) => Promise<ApolloQueryResult<GetAcademicYearsQuery>>;
    const toBeUpdatedHolidayPayload =
      props.toBeUpdatedHolidayPayload as HolidayPayload & { id: string };

    const updateHoliday = props.updateHoliday as UpdateHolidayMutationFn;

    updateHoliday({
      variables: {
        id: toBeUpdatedHolidayPayload.id,
        academicYearId: toBeUpdatedHolidayPayload.academicYearId as string,
        endDate: toBeUpdatedHolidayPayload.endDate,
        name: toBeUpdatedHolidayPayload.name,
        startDate: toBeUpdatedHolidayPayload.startDate
      }
    })
      .then(async () => {
        await refetchAcademicYears();
        setShow(false);
      })
      .catch((error) => console.log(error));
  },
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      name: props.name,
      academicYearId: props.academicYearId,
      startDate: props.startDate,
      endDate: props.endDate,
      id: props.id
    };
  }
})(InnerForm);

const mapStateToProps = (state: RootState) => {
  return state.editholiday.toBeUpdatedHolidayPayload;
};

interface DispatchMap {
  setToBeUpdatedHolidayPayload: (params: Pair<HolidayPayload>) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchMap => ({
  setToBeUpdatedHolidayPayload: (params: Pair<HolidayPayload>) => {
    dispatch(setToBeUpdatedHolidayPayload(params));
  }
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(MyForm);

interface EditHolidayFormProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditHolidayForm: React.FC<EditHolidayFormProps> = ({
  setShow
}) => {
  const { refetch } = useGetAcademicYearsQuery();
  const toBeUpdatedHolidayPayload = useAppSelector(
    selectToBeUpdatedHolidayPayload
  );
  //   const dispatch = useAppDispatch();
  const [updateHoliday] = useUpdateHolidayMutation();

  return (
    <ConnectedForm
      setShow={setShow}
      refetch={refetch}
      toBeUpdatedHolidayPayload={toBeUpdatedHolidayPayload}
      updateHoliday={updateHoliday}
    />
  );
};
