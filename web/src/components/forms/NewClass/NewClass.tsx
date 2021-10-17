import React from "react";
import { withFormik, FormikProps, Form } from "formik";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { TermPayload } from "../../../shared/NewAcademicYear.slice";

import { Pair } from "../../../types";
import { Button, LoaderButton } from "../../button";
import { FormikBasicTextInput, SelectInput } from "../../input";

import css from "./NewClass.module.css";
import {
  ClassPayload,
  selectClassSchedulePayload,
  setClassPayload,
  setClassSchedulePayload,
} from "../../../shared/NewClass.slice";
import {
  useGetSubjectsQuery,
  useNewClassMutation,
} from "../../../generated/graphql";
import { FormikBasicSelectInput } from "../../input/BasicSelectInput";
import { OneOffSchedule } from "./OneOffSchedule";
import { RepeatSchedule } from "./RepeatSchedule";

const InnerForm = (props: FormikProps<TermPayload> & DispatchMap) => {
  const { touched, errors, setSubjectPayload, isSubmitting } = props;
  const [advanceMenu, setAdvanceMenu] = React.useState<boolean>(false);
  const { data, loading } = useGetSubjectsQuery();
  const { type: activeTab } = useAppSelector(selectClassSchedulePayload);
  const dispatch = useAppDispatch();

  React.useLayoutEffect(() => {
    if (touched.name && errors.name) {
      document.querySelector(`.${css.name}`)?.classList.add(css.error);
    } else {
      document.querySelector(`.${css.name}`)?.classList.remove(css.error);
    }
  }, [touched.name, errors.name]);

  // const validateName = (value: string) => {
  //   if (value.length === 0) return "Required";
  //   return null;
  // };

  return (
    <Form className={css.form}>
      <div className={css.field}>
        <div className={css.group}>
          <div className={css.row}>
            <FormikBasicSelectInput
              label="Subject"
              name={"Subject"}
              options={data?.getSubjects.map((subject) => {
                return {
                  key: subject.id,
                  value: subject.id,
                  label: subject.name,
                };
              })}
            />
            <FormikBasicTextInput
              className={css.name}
              name="module"
              // validate={validateName}
              onChange={(e) => {
                setClassPayload({
                  key: "module",
                  value: e.target.value,
                });
              }}
              label="Module"
            />
            {/* {touched.name && errors.name && (
              <div className="error">{errors.name}</div>
            )} */}
          </div>
          <div className={css.row}>
            <FormikBasicTextInput
              className={css.name}
              name="room"
              // validate={validateName}
              onChange={(e) => {
                setClassPayload({
                  key: "room",
                  value: e.target.value,
                });
              }}
              label="Room"
            />
            <FormikBasicTextInput
              className={css.name}
              name="building"
              // validate={validateName}
              onChange={(e) => {
                setClassPayload({
                  key: "building",
                  value: e.target.value,
                });
              }}
              label="Building"
            />
          </div>
          <div className={css.row}>
            <FormikBasicTextInput
              className={css.name}
              name="teacher"
              // validate={validateName}
              onChange={(e) => {
                setClassPayload({
                  key: "teacher",
                  value: e.target.value,
                });
              }}
              label="Teacher"
            />
          </div>
          <div
            style={{
              marginTop: "2rem",
            }}
          >
            <div className={css.tabs}>
              <div
                onClick={(e) => {
                  dispatch(
                    setClassSchedulePayload({ key: "type", value: "oneOff" })
                  );
                }}
                className={activeTab === "oneOff" ? css.active : undefined}
              >
                One-Off
              </div>
              <div
                onClick={(_e) => {
                  dispatch(
                    setClassSchedulePayload({ key: "type", value: "repeat" })
                  );
                }}
                className={activeTab === "repeat" ? css.active : undefined}
              >
                Repeat
              </div>
            </div>
            <div className={css.tabContent}>
              {activeTab === "oneOff" && <OneOffSchedule />}
              {activeTab === "repeat" && <RepeatSchedule />}
            </div>
          </div>
        </div>
      </div>

      <div className={css.btns}>
        <LoaderButton
          style={{
            padding: "1rem 2rem",
          }}
          loading={isSubmitting}
          type="submit"
          text="Save"
          as="primary"
        />
      </div>
    </Form>
  );
};

// The type of props MyForm receives

// Wrap our form with the withFormik HoC
const MyForm = withFormik<any, ClassPayload>({
  handleSubmit: (values, { props }) => {},
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      academicYearId: props.academicYearId,
      building: props.building,
      module: props.module,
      name: props.name,
      room: props.room,
      subjectId: props.subjectId,
      teacher: props.teacher,
    };
  },
})(InnerForm);

const mapStateToProps = (state: RootState) => {
  return state.newsubject.subjectPayload;
};

interface DispatchMap {
  setSubjectPayload: (params: Pair<ClassPayload>) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchMap => ({
  setSubjectPayload: (params: Pair<ClassPayload>) => {
    dispatch(setClassPayload(params));
  },
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(MyForm);

interface NewClassProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewClassForm: React.FC<NewClassProps> = ({ setShow }) => {
  const [newClass] = useNewClassMutation();
  return <ConnectedForm newClass={newClass} setShow={setShow} />;
};
