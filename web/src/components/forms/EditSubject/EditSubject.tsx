import React from "react";
import { withFormik, FormikProps, Form } from "formik";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";
import { TermPayload } from "../../../shared/NewAcademicYear.slice";

import { Pair } from "../../../types";
import { LoaderButton } from "../../button";
import { FormikBasicTextInput, SelectInput } from "../../input";

import css from "./EditSubject.module.css";
import { selectScheduleComponentState } from "../../../shared/Schedule.slice";
import {
  selectSubjectPayload,
  setSubjectPayload,
  SubjectPayload
} from "../../../shared/NewSubject.slice";
import {
  Exact,
  GetSubjectsQuery,
  NewSubjectMutationFn,
  UpdateSubjectMutationFn,
  useGetSubjectsQuery,
  useNewSubjectMutation,
  useUpdateSubjectMutation
} from "../../../generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import {
  selectToBeUpdatedSubjectPayload,
  setToBeUpdatedSubjectPayload
} from "../../../shared/EditSubject.slice";
import { formatDate } from "../../../utils";
const InnerForm = (props: FormikProps<TermPayload> & DispatchMap) => {
  const { touched, errors, setToBeUpdatedSubjectPayload, isSubmitting } = props;
  const toBeUpdatedSubjectPayload = useAppSelector(
    selectToBeUpdatedSubjectPayload
  );

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
              defaultValue={toBeUpdatedSubjectPayload?.name}
              validate={validateName}
              onChange={(e) => {
                setToBeUpdatedSubjectPayload({
                  key: "name",
                  value: e.target.value
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
        <AdvancedMenu />
      </div>

      <div className={css.group}>
        <div className="txt-md">What are Subjects?</div>
        <div className="txt-sm">
          Subjects are also known as courses and enable you to group all of your
          classes, tasks and exams for that course.
        </div>
      </div>
      <div className={css.btns}>
        <LoaderButton
          style={{
            padding: "1rem 2rem"
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

const AdvancedMenu: React.FC = () => {
  const { academicYears } = useAppSelector(selectScheduleComponentState);
  const toBeUpdatedSubjectPayload = useAppSelector(
    selectToBeUpdatedSubjectPayload
  );
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <SelectInput
          defaultValue={toBeUpdatedSubjectPayload?.academicYearId}
          defaultSubValue={toBeUpdatedSubjectPayload?.termId}
          setState={(value) => {
            dispatch(
              setToBeUpdatedSubjectPayload({
                key: "academicYearId",
                value: value
              })
            );
          }}
          setSubState={(value) => {
            dispatch(
              setToBeUpdatedSubjectPayload({
                key: "termId",
                value: value
              })
            );
          }}
          label="Year / Term"
          options={[
            {
              key: "None",
              value: undefined
            },
            ...academicYears.map((academicYear) => {
              return {
                key: `${academicYear.startDate.split("-")[0]} - ${
                  academicYear.endDate.split("-")[0]
                }`,
                value: academicYear.id,
                children: [...academicYear?.terms]
                  .sort((a, b) => {
                    return new Date(a.startDate) > new Date(b.startDate)
                      ? 1
                      : -1;
                  })
                  .map((term) => {
                    return {
                      key: term.name,
                      value: term.id
                    };
                  })
              };
            })
          ]}
        />
        <div
          className="txt-sm"
          style={{ paddingBottom: "0.5rem", paddingLeft: "0.5rem" }}
        >
          {toBeUpdatedSubjectPayload?.academicYearId
            ? `In timetable from ${formatDate(
                new Date(
                  academicYears.filter(
                    (academicYear) =>
                      academicYear.id ===
                      toBeUpdatedSubjectPayload?.academicYearId
                  )[0]?.startDate
                )
              )} to ${formatDate(
                new Date(
                  academicYears.filter(
                    (academicYear) =>
                      academicYear.id ===
                      toBeUpdatedSubjectPayload?.academicYearId
                  )[0]?.endDate
                )
              )}`
            : `In timetable indefinitely`}
        </div>
      </div>
      <div className="txt-sm">
        <p>
          Select a year or term for this subject if you are only taking it for a
          single year or term. If you are taking this subject over multiple
          years, assign the year or term to the class instead.
        </p>
      </div>
    </React.Fragment>
  );
};

// The type of props MyForm receives

// Wrap our form with the withFormik HoC
const MyForm = withFormik<any, SubjectPayload>({
  handleSubmit: (values, { props }) => {
    const setShow = props.setShow as React.Dispatch<
      React.SetStateAction<boolean>
    >;
    const refetch = props.refetch as (
      variables?:
        | Partial<
            Exact<{
              [key: string]: never;
            }>
          >
        | undefined
    ) => Promise<ApolloQueryResult<GetSubjectsQuery>>;
    const updateSubject = props.updateSubject as UpdateSubjectMutationFn;
    const toBeUpdatedSubjectPayload =
      props.toBeUpdatedSubjectPayload as SubjectPayload & { id: string };

    // edit subject here
    updateSubject({
      variables: {
        id: toBeUpdatedSubjectPayload.id,
        name: toBeUpdatedSubjectPayload.name,
        academicYearId: toBeUpdatedSubjectPayload.academicYearId,
        termId: toBeUpdatedSubjectPayload.termId
      }
    }).then(async () => {
      await refetch();
      setShow(false);
    });
  },
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      name: props.name,
      academicYearId: props.academicYearId,
      termId: props.termId
    };
  }
})(InnerForm);

const mapStateToProps = (state: RootState) => {
  return state.editsubject.toBeUpdatedSubjectPayload;
};

interface DispatchMap {
  setToBeUpdatedSubjectPayload: (params: Pair<SubjectPayload>) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchMap => ({
  setToBeUpdatedSubjectPayload: (params: Pair<SubjectPayload>) => {
    dispatch(setToBeUpdatedSubjectPayload(params));
  }
});

const ConnectedForm = connect(mapStateToProps, mapDispatchToProps)(MyForm);

interface EditSubjectFormProps {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditSubjectForm: React.FC<EditSubjectFormProps> = ({
  setShow
}) => {
  const [updateSubject] = useUpdateSubjectMutation();
  const toBeUpdatedSubjectPayload = useAppSelector(
    selectToBeUpdatedSubjectPayload
  );
  const { refetch } = useGetSubjectsQuery();
  return (
    <ConnectedForm
      updateSubject={updateSubject}
      refetch={refetch}
      setShow={setShow}
      toBeUpdatedSubjectPayload={toBeUpdatedSubjectPayload}
    />
  );
};
