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
  ClassSchedulePayload,
  OneOffSchedulePayload,
  RepeatSchedulePayload,
  selectClassPayload,
  selectClassSchedulePayload,
  selectOneOffSchedulePayload,
  selectRepeatSchedules,
  setClassPayload,
  setClassPayloadToDefault,
  setClassSchedulePayload,
  setClassSchedulePayloadToDefault,
  setOneOffSchedulePayloadToDefault,
  setRepeatSchedulesToDefault,
} from "../../../shared/NewClass.slice";
import {
  Exact,
  GetClassesQuery,
  NewClassMutationFn,
  NewClassScheduleMutationFn,
  NewOneOffScheduleMutationFn,
  NewRepeatScheduleMutationFn,
  useGetAcademicYearsQuery,
  useGetClassesQuery,
  useGetSubjectsQuery,
  useNewClassMutation,
  useNewClassScheduleMutation,
  useNewOneOffScheduleMutation,
  useNewRepeatScheduleMutation,
} from "../../../generated/graphql";
import { FormikBasicSelectInput } from "../../input/BasicSelectInput";
import { OneOffSchedule } from "./OneOffSchedule";
import { NewClass, NewSubject, RepeatSchedule } from "../../modal";
import { asyncForEach } from "../../../utils";
import { ApolloQueryResult } from "@apollo/client";

const InnerForm = (props: FormikProps<TermPayload> & DispatchMap) => {
  const { touched, errors, setClassPayload, isSubmitting } = props;
  const [advanceMenu, setAdvanceMenu] = React.useState<boolean>(false);
  const { data: subjects } = useGetSubjectsQuery();
  const { type: activeTab } = useAppSelector(selectClassSchedulePayload);
  const classPayload = useAppSelector(selectClassPayload);
  const dispatch = useAppDispatch();

  React.useLayoutEffect(() => {
    if (touched.name && errors.name) {
      document.querySelector(`.${css.name}`)?.classList.add(css.error);
    } else {
      document.querySelector(`.${css.name}`)?.classList.remove(css.error);
    }
  }, [touched.name, errors.name]);

  React.useEffect(() => {
    if (subjects)
      setClassPayload({
        key: "subjectId",
        value: subjects.getSubjects[0].id,
      });
  }, []);

  // const validateName = (value: string) => {
  //   if (value.length === 0) return "Required";
  //   return null;
  // };
  if (subjects)
    return (
      <Form className={css.form}>
        <div className={css.field}>
          <div className={css.group}>
            <div className={css.row}>
              <div
                style={{
                  gridTemplateColumns: "1fr min-content",
                  columnGap: 0,
                }}
                className={css.row}
              >
                <FormikBasicSelectInput
                  label="Subject"
                  name={"Subject"}
                  options={subjects?.getSubjects
                    .filter(
                      (subject) =>
                        !subject.academicYear ||
                        subject.academicYear.id === classPayload.academicYearId
                    )
                    .map((subject) => {
                      return {
                        key: subject.id,
                        value: subject.id,
                        label: subject.name,
                      };
                    })}
                  onChange={(e) => {
                    setClassPayload({
                      key: "subjectId",
                      value: e.target.value,
                    });
                  }}
                />
                <NewSubject controller="plus" />
              </div>
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
  else return null;
};

// The type of props MyForm receives

// Wrap our form with the withFormik HoC
const MyForm = withFormik<any, ClassPayload>({
  handleSubmit: (values, { props }) => {
    const classPayload = props.classPayload as ClassPayload;
    const classSchedulePayload =
      props.classSchedulePayload as ClassSchedulePayload;
    const oneOffSchedulePayload =
      props.oneOffSchedulePayload as OneOffSchedulePayload;
    const repeatSchedules = props.repeatSchedules as RepeatSchedulePayload[];
    const newClass = props.newClass as NewClassMutationFn;
    const newClassSchedule =
      props.newClassSchedule as NewClassScheduleMutationFn;
    const newOneOffSchedule =
      props.newOneOffSchedule as NewOneOffScheduleMutationFn;
    const newRepeatSchedule =
      props.newRepeatSchedule as NewRepeatScheduleMutationFn;
    const setShow = props.setShow as React.Dispatch<
      React.SetStateAction<boolean>
    >;
    const refetchClasses = props.refetchClasses as (
      variables?:
        | Partial<
            Exact<{
              [key: string]: never;
            }>
          >
        | undefined
    ) => Promise<ApolloQueryResult<GetClassesQuery>>;
    const setClassPayloadToDefault = props.setClassPayloadToDefault;
    const setClassSchedulePayloadToDefault =
      props.setClassSchedulePayloadToDefault;
    const setOneOffSchedulePayloadToDefault =
      props.setOneOffSchedulePayloadToDefault;
    const setRepeatSchedulesToDefault = props.setRepeatSchedulesToDefault;
    newClass({
      variables: {
        ...classPayload,
        subjectId: classPayload.subjectId as string,
        academicYearId: classPayload.academicYearId as string,
      },
    })
      .then(async (response) => {
        const classId = response.data?.newClass.id;
        await newClassSchedule({
          variables: {
            classId: classId as string,
            type: classSchedulePayload.type,
          },
        }).then(async (response) => {
          const classScheduleId = response.data?.newClassSchedule.id;
          if (classSchedulePayload.type === "oneOff") {
            // create one off schedule
            await newOneOffSchedule({
              variables: {
                scheduleId: classScheduleId as string,
                ...oneOffSchedulePayload,
              },
            });
          } else {
            // create repeat schedule
            await asyncForEach(repeatSchedules, async (repeatSchedule) => {
              await newRepeatSchedule({
                variables: {
                  startDate: null,
                  endDate: null,
                  scheduleId: classScheduleId as string,
                  startTime: repeatSchedule.startTime,
                  endTime: repeatSchedule.endTime,
                  repeatDays: repeatSchedule.days,
                  rotationWeek: repeatSchedule.rotationWeek,
                },
              });
            });
          }
        });
        await refetchClasses();
        setClassPayloadToDefault();
        setClassSchedulePayloadToDefault();
        setOneOffSchedulePayloadToDefault();
        setRepeatSchedulesToDefault();
        setShow(false);
      })
      .catch((error) => console.log(error));
  },
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
  return state.newclass.classPayload;
};

interface DispatchMap {
  setClassPayload: (params: Pair<ClassPayload>) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchMap => ({
  setClassPayload: (params: Pair<ClassPayload>) => {
    dispatch(setClassPayload(params));
  },
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(MyForm);

interface NewClassProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewClassForm: React.FC<NewClassProps> = ({ setShow }) => {
  const [newClass] = useNewClassMutation();
  const [newClassSchedule] = useNewClassScheduleMutation();
  const [newOneOffSchedule] = useNewOneOffScheduleMutation();
  const [newRepeatSchedule] = useNewRepeatScheduleMutation();
  const { refetch } = useGetClassesQuery({
    fetchPolicy: "network-only",
  });

  const classPayload = useAppSelector(selectClassPayload);
  const classSchedulePayload = useAppSelector(selectClassSchedulePayload);
  const oneOffSchedulePayload = useAppSelector(selectOneOffSchedulePayload);
  const repeatSchedules = useAppSelector(selectRepeatSchedules);

  const dispatch = useAppDispatch();

  return (
    <ConnectedForm
      newClass={newClass}
      newClassSchedule={newClassSchedule}
      newOneOffSchedule={newOneOffSchedule}
      newRepeatSchedule={newRepeatSchedule}
      setShow={setShow}
      classPayload={classPayload}
      classSchedulePayload={classSchedulePayload}
      oneOffSchedulePayload={oneOffSchedulePayload}
      repeatSchedules={repeatSchedules}
      setClassPayloadToDefault={() => dispatch(setClassPayloadToDefault())}
      setClassSchedulePayloadToDefault={() =>
        dispatch(setClassSchedulePayloadToDefault())
      }
      setOneOffSchedulePayloadToDefault={() =>
        dispatch(setOneOffSchedulePayloadToDefault())
      }
      setRepeatSchedulesToDefault={() =>
        dispatch(setRepeatSchedulesToDefault())
      }
      refetchClasses={refetch}
    />
  );
};
