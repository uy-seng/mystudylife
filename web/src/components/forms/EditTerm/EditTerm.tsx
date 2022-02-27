import React from "react";
import { withFormik, FormikProps, Form } from "formik";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import {
  TermPayload,
  selectCreateTermComponentState,
  setTermPayload,
  setEditTermPayload,
  selectEditTermPayload,
  setTerms,
} from "../../../shared/NewAcademicYear.slice";

import { Pair } from "../../../types";
import { isValidDateFormat, getMonthName, formatDate } from "../../../utils";
import { Button } from "../../button";
import { FormikBasicTextInput, FormikDatepicker } from "../../input";
import { CgDanger } from "react-icons/cg";

import css from "./EditTerm.module.css";

const InnerForm = (props: FormikProps<TermPayload> & DispatchMap) => {
  const { touched, errors, setEditTermPayload } = props;
  const editTermPayload = useAppSelector(selectEditTermPayload);

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
    if (
      new Date(editTermPayload!.startDate) >= new Date(editTermPayload!.endDate)
    )
      return "Invalid start date. (Start date must occur before end date)";
    return null;
  };

  const validateEndDate = (value: string) => {
    const date = new Date();
    if (!isValidDateFormat(value))
      return `Invalid date. Must be in format ${getMonthName(
        date.getMonth()
      )} ${date.getDate()} ${date.getFullYear()}. MM DD YYYY`;
    if (
      new Date(editTermPayload!.endDate) <= new Date(editTermPayload!.startDate)
    )
      return "Invalid end date. (End date must occur after start date)";
    return null;
  };

  React.useEffect(() => {
    setEditTermPayload({
      key: "endDate",
      value: formatDate(
        new Date(
          new Date(editTermPayload!.startDate).setMonth(
            new Date(editTermPayload!.startDate).getMonth() + 2
          )
        )
      ),
    });
  }, [editTermPayload?.startDate]);

  if (editTermPayload)
    return (
      <Form>
        <div className={css.field}>
          <div className={css.group}>
            <div>
              <FormikBasicTextInput
                className={css.name}
                name="name"
                defaultValue={editTermPayload.name}
                validate={validateName}
                onChange={(e) => {
                  setEditTermPayload({
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
                defaultValue={editTermPayload.startDate}
                name="startDate"
                validate={validateStartDate}
                dateHandler={(value) => {
                  setEditTermPayload({
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
                defaultValue={editTermPayload.endDate}
                name="endDate"
                validate={validateEndDate}
                dateHandler={(value) => {
                  setEditTermPayload({
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
  else return null;
};

// The type of props MyForm receives

// Wrap our form with the withFormik HoC
const MyForm = withFormik<any, TermPayload>({
  handleSubmit: (values, { props }) => {
    const setShow = props.setShow as React.Dispatch<
      React.SetStateAction<boolean>
    >;
    const terms = props.terms as TermPayload[];
    const setTerms = props.setTerms;
    setTerms([...terms.filter((term) => term.id !== values.id), values]);
    setShow(false);
  },
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      id: props.id,
      name: props.name,
      startDate: props.startDate,
      endDate: props.endDate,
    };
  },
})(InnerForm);

const mapStateToProps = (state: RootState) => {
  return state.newacademicyear.editTermPayload;
};

interface DispatchMap {
  setEditTermPayload: (params: Pair<TermPayload>) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchMap => ({
  setEditTermPayload: (params: Pair<TermPayload>) => {
    dispatch(setEditTermPayload(params));
  },
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(MyForm);

interface Props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditTermForm: React.FC<Props> = ({ setShow }) => {
  const dispatch = useAppDispatch();
  const { terms } = useAppSelector(selectCreateTermComponentState);
  const setTermsAction = (term: TermPayload[]) => {
    dispatch(setTerms(term));
  };
  return (
    <ConnectedForm setShow={setShow} terms={terms} setTerms={setTermsAction} />
  );
};
