import React from "react";
import { withFormik, FormikProps, Form } from "formik";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { TermPayload } from "../../../shared/NewAcademicYear.slice";

import { Pair } from "../../../types";
import { Button, LoaderButton } from "../../button";
import {
  FormikBasicTextInput,
  FormikDatepicker,
  SelectInput,
} from "../../input";

import css from "./NewTask.module.css";
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
  GetTasksQuery,
  NewClassMutationFn,
  NewClassScheduleMutationFn,
  NewOneOffScheduleMutationFn,
  NewRepeatScheduleMutationFn,
  NewTaskMutationFn,
  TaskType,
  useGetAcademicYearsQuery,
  useGetClassesQuery,
  useGetSubjectsQuery,
  useGetTasksQuery,
  useNewClassMutation,
  useNewClassScheduleMutation,
  useNewOneOffScheduleMutation,
  useNewRepeatScheduleMutation,
  useNewTaskMutation,
} from "../../../generated/graphql";
import { FormikBasicSelectInput } from "../../input/BasicSelectInput";
import { NewClass, NewSubject, RepeatSchedule } from "../../modal";
import { asyncForEach } from "../../../utils";
import { ApolloQueryResult } from "@apollo/client";
import {
  selectTaskPayload,
  setTaskPayload,
  setTaskPayloadToDefault,
  TaskPayload,
} from "../../../shared/NewTask.slice";
import { FormikBasicTextAreaInput } from "../../input/BasicTextInput/FormikBasicTextAreaInput";

const InnerForm = (props: FormikProps<TermPayload> & DispatchMap) => {
  const { touched, errors, setTaskPayload, isSubmitting } = props;
  const { data: subjects } = useGetSubjectsQuery();
  const taskPayload = useAppSelector(selectTaskPayload);
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
      setTaskPayload({
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
                        subject.academicYear.id === taskPayload.academicYearId
                    )
                    .map((subject) => {
                      return {
                        key: subject.id,
                        value: subject.id,
                        label: subject.name,
                      };
                    })}
                  onChange={(e) => {
                    setTaskPayload({
                      key: "subjectId",
                      value: e.target.value,
                    });
                  }}
                />
                <NewSubject controller="plus" />
              </div>
              <FormikBasicSelectInput
                label="Type"
                name={"Type"}
                options={["assignment", "reminder", "revision"].map((type) => {
                  return {
                    key: type,
                    value: type,
                    label: type.charAt(0).toUpperCase() + type.slice(1),
                  };
                })}
                onChange={(e) => {
                  setTaskPayload({
                    key: "type",
                    value: e.target.value as TaskType,
                  });
                }}
              />
            </div>
            <div className={css.row}>
              <FormikDatepicker
                name="due_date"
                dateHandler={(value) => {
                  setTaskPayload({
                    key: "due_date",
                    value: value,
                  });
                }}
                defaultValue={taskPayload.due_date}
                label="Due Date"
              />
            </div>
            <div>
              <FormikBasicTextInput
                className={css.name}
                name="title"
                onChange={(e) => {
                  setTaskPayload({
                    key: "title",
                    value: e.target.value,
                  });
                }}
                label="Title"
              />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <FormikBasicTextAreaInput
                className={css.name}
                name="detail"
                onChange={(e) => {
                  setTaskPayload({
                    key: "detail",
                    value: e.target.value,
                  });
                }}
                label="Detail"
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "1rem" }} className={css.btns}>
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
    const taskPayload = props.taskPayload as TaskPayload;
    const newTask = props.newTask as NewTaskMutationFn;
    const setShow = props.setShow as React.Dispatch<
      React.SetStateAction<boolean>
    >;
    const setTaskPayloadToDefault = props.setTaskPayloadToDefault;
    const refetchTasks = props.refetchTasks as (
      variables?:
        | Partial<
            Exact<{
              [key: string]: never;
            }>
          >
        | undefined
    ) => Promise<ApolloQueryResult<GetTasksQuery>>;

    // create new task operations here
    newTask({
      variables: {
        due_date: taskPayload.due_date,
        title: taskPayload.title,
        detail: taskPayload.detail,
        type: taskPayload.type,
        subjectId: taskPayload.subjectId as string,
        academicYearId: taskPayload.academicYearId,
      },
    }).then(() => {
      setTaskPayloadToDefault();
      setShow(false);
      refetchTasks();
    });
  },
  enableReinitialize: true,
  //   mapPropsToValues: (props) => {
  //     return {
  //       academicYearId: props.academicYearId,
  //       building: props.building,
  //       module: props.module,
  //       name: props.name,
  //       room: props.room,
  //       subjectId: props.subjectId,
  //       teacher: props.teacher,
  //     };
  //   },
})(InnerForm);

const mapStateToProps = (state: RootState) => {
  return state.newtask.taskPayload;
};

interface DispatchMap {
  setTaskPayload: (params: Pair<TaskPayload>) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchMap => ({
  setTaskPayload: (params: Pair<TaskPayload>) => {
    dispatch(setTaskPayload(params));
  },
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(MyForm);

interface NewTaskFormProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewTaskForm: React.FC<NewTaskFormProps> = ({ setShow }) => {
  const [newTask] = useNewTaskMutation();
  const { refetch } = useGetTasksQuery({
    fetchPolicy: "network-only",
  });

  const taskPayload = useAppSelector(selectTaskPayload);
  const dispatch = useAppDispatch();

  return (
    <ConnectedForm
      newTask={newTask}
      setShow={setShow}
      taskPayload={taskPayload}
      setTaskPayloadToDefault={() => dispatch(setTaskPayloadToDefault())}
      refetchTasks={refetch}
    />
  );
};
