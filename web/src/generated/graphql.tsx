import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AcademicYear = {
  __typename?: 'AcademicYear';
  id: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  terms: Array<Term>;
  schedule: AcademicYearSchedule;
  subjects: Array<Subject>;
  classes: Array<Class>;
};

export type AcademicYearSchedule = {
  __typename?: 'AcademicYearSchedule';
  id: Scalars['String'];
  type: AcademicYearScheduleType;
  dayRotation?: Maybe<DayRotationSchedule>;
  weekRotation?: Maybe<WeekRotationSchedule>;
};

export type AcademicYearScheduleType =
  | 'fixed'
  | 'weekRotation'
  | 'dayRotation';

export type Class = {
  __typename?: 'Class';
  id: Scalars['String'];
  module: Scalars['String'];
  room: Scalars['String'];
  building: Scalars['String'];
  teacher: Scalars['String'];
  subject: Subject;
  schedule: ClassSchedule;
  academicYear?: Maybe<AcademicYear>;
  user: User;
};

export type ClassSchedule = {
  __typename?: 'ClassSchedule';
  id: Scalars['String'];
  type: ClassScheduleType;
  oneOff?: Maybe<OneOffSchedule>;
  repeat?: Maybe<Array<RepeatSchedule>>;
};

export type ClassScheduleType =
  | 'repeat'
  | 'oneOff';


export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type DayRotationSchedule = {
  __typename?: 'DayRotationSchedule';
  id: Scalars['String'];
  numOfDay: Scalars['Int'];
  startDay: Scalars['Int'];
  repeatDays: Array<Scalars['Int']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<Scalars['Boolean']>;
  login: LoginResponse;
  logout: Scalars['Boolean'];
  newAcademicYear: AcademicYear;
  deleteAcademicYear: Scalars['Boolean'];
  newSchedule: AcademicYearSchedule;
  newPartialWeekRotation: WeekRotationSchedule;
  newPartialDayRotation: DayRotationSchedule;
  newTerm: Term;
  newSubject: Subject;
  deleteSubject: Scalars['Boolean'];
  updateSubject: Scalars['Boolean'];
  newClass: Class;
  deleteClass: Scalars['Boolean'];
  updateClass: Scalars['Boolean'];
  newClassSchedule: ClassSchedule;
  newOneOffSchedule: OneOffSchedule;
  updateOneOffSchedule: Scalars['Boolean'];
  newRepeatSchedule: RepeatSchedule;
  updateRepeatSchedule: Scalars['Boolean'];
  deleteRepeatSchedule: Scalars['Boolean'];
  newTask: Task;
  deleteTask: Scalars['Boolean'];
  updateTask: Scalars['Boolean'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationNewAcademicYearArgs = {
  startDate: Scalars['String'];
  endDate: Scalars['String'];
};


export type MutationDeleteAcademicYearArgs = {
  id: Scalars['String'];
};


export type MutationNewScheduleArgs = {
  type: AcademicYearScheduleType;
  academicYearId: Scalars['String'];
};


export type MutationNewPartialWeekRotationArgs = {
  numOfWeek: Scalars['Int'];
  startWeek: Scalars['Int'];
  scheduleId: Scalars['String'];
};


export type MutationNewPartialDayRotationArgs = {
  startDay: Scalars['Int'];
  numOfDay: Scalars['Int'];
  repeatDays: Array<Scalars['Int']>;
  scheduleId: Scalars['String'];
};


export type MutationNewTermArgs = {
  name: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  academicYearId: Scalars['String'];
};


export type MutationNewSubjectArgs = {
  termId?: Maybe<Scalars['String']>;
  academicYearId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationDeleteSubjectArgs = {
  id: Scalars['String'];
};


export type MutationUpdateSubjectArgs = {
  academicYearId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  id: Scalars['String'];
};


export type MutationNewClassArgs = {
  subjectId: Scalars['String'];
  module?: Maybe<Scalars['String']>;
  room?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  teacher?: Maybe<Scalars['String']>;
  academicYearId?: Maybe<Scalars['String']>;
};


export type MutationDeleteClassArgs = {
  id: Scalars['String'];
};


export type MutationUpdateClassArgs = {
  subjectId: Scalars['String'];
  module?: Maybe<Scalars['String']>;
  room?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  teacher?: Maybe<Scalars['String']>;
  academicYearId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationNewClassScheduleArgs = {
  type: ClassScheduleType;
  classId: Scalars['String'];
};


export type MutationNewOneOffScheduleArgs = {
  date: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  scheduleId: Scalars['String'];
};


export type MutationUpdateOneOffScheduleArgs = {
  date: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  scheduleId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationNewRepeatScheduleArgs = {
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  repeatDays: Array<DayOfWeek>;
  scheduleId: Scalars['String'];
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  rotationWeek?: Maybe<Scalars['Int']>;
};


export type MutationUpdateRepeatScheduleArgs = {
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  repeatDays: Array<DayOfWeek>;
  scheduleId: Scalars['String'];
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  rotationWeek?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
};


export type MutationDeleteRepeatScheduleArgs = {
  id: Scalars['String'];
};


export type MutationNewTaskArgs = {
  subjectId: Scalars['String'];
  academicYearId?: Maybe<Scalars['String']>;
  type: TaskType;
  due_date: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
};


export type MutationDeleteTaskArgs = {
  id: Scalars['String'];
};


export type MutationUpdateTaskArgs = {
  subjectId: Scalars['String'];
  academicYearId?: Maybe<Scalars['String']>;
  type: TaskType;
  due_date: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type OneOffSchedule = {
  __typename?: 'OneOffSchedule';
  id: Scalars['String'];
  date: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  getAcademicYears: Array<AcademicYear>;
  getAcademicYear?: Maybe<AcademicYear>;
  getSubjects: Array<Subject>;
  getSubject: Subject;
  getClasses: Array<Class>;
  getClassById: Class;
  getClassesByDate: Array<Class>;
  getTasks: Array<Task>;
  getTaskById: Task;
  getTasksByDate: Array<Task>;
};


export type QueryGetAcademicYearArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryGetSubjectArgs = {
  id: Scalars['String'];
};


export type QueryGetClassByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetClassesByDateArgs = {
  date: Scalars['DateTime'];
};


export type QueryGetTaskByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetTasksByDateArgs = {
  date: Scalars['DateTime'];
};

export type RepeatSchedule = {
  __typename?: 'RepeatSchedule';
  id: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  repeatDays: Array<DayOfWeek>;
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  rotationWeek?: Maybe<Scalars['Int']>;
};

export type Subject = {
  __typename?: 'Subject';
  id: Scalars['String'];
  name: Scalars['String'];
  academicYear?: Maybe<AcademicYear>;
  term?: Maybe<Term>;
};

export type Task = {
  __typename?: 'Task';
  id: Scalars['String'];
  type: Scalars['String'];
  due_date: Scalars['String'];
  title: Scalars['String'];
  detail: Scalars['String'];
  subject: Subject;
  academicYear?: Maybe<AcademicYear>;
};

export type TaskType =
  | 'assignment'
  | 'revision'
  | 'review';

export type Term = {
  __typename?: 'Term';
  id: Scalars['String'];
  name: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  provider: UserProvider;
  tokenVersion: Scalars['Int'];
};

export type UserProvider = {
  __typename?: 'UserProvider';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type WeekRotationSchedule = {
  __typename?: 'WeekRotationSchedule';
  id: Scalars['String'];
  numOfWeek: Scalars['Int'];
  startWeek: Scalars['Int'];
};

export type DeleteAcademicYearMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteAcademicYearMutation = { __typename?: 'Mutation', deleteAcademicYear: boolean };

export type DeleteClassMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteClassMutation = { __typename?: 'Mutation', deleteClass: boolean };

export type DeleteRepeatScheduleMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteRepeatScheduleMutation = { __typename?: 'Mutation', deleteRepeatSchedule: boolean };

export type DeleteSubjectMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteSubjectMutation = { __typename?: 'Mutation', deleteSubject: boolean };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: boolean };

export type GetAcademicYearQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type GetAcademicYearQuery = { __typename?: 'Query', getAcademicYear?: Maybe<{ __typename?: 'AcademicYear', id: string, startDate: string, endDate: string, schedule: { __typename?: 'AcademicYearSchedule', type: AcademicYearScheduleType, dayRotation?: Maybe<{ __typename?: 'DayRotationSchedule', id: string }>, weekRotation?: Maybe<{ __typename?: 'WeekRotationSchedule', numOfWeek: number, startWeek: number }> } }> };

export type GetAcademicYearsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAcademicYearsQuery = { __typename?: 'Query', getAcademicYears: Array<{ __typename?: 'AcademicYear', id: string, startDate: string, endDate: string, terms: Array<{ __typename?: 'Term', id: string, name: string, startDate: string, endDate: string }>, schedule: { __typename?: 'AcademicYearSchedule', id: string, type: AcademicYearScheduleType, dayRotation?: Maybe<{ __typename?: 'DayRotationSchedule', id: string, numOfDay: number, startDay: number, repeatDays: Array<number> }>, weekRotation?: Maybe<{ __typename?: 'WeekRotationSchedule', id: string, numOfWeek: number, startWeek: number }> } }> };

export type GetClassesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClassesQuery = { __typename?: 'Query', getClasses: Array<{ __typename?: 'Class', id: string, building: string, module: string, room: string, teacher: string, academicYear?: Maybe<{ __typename?: 'AcademicYear', id: string, startDate: string, endDate: string, schedule: { __typename?: 'AcademicYearSchedule', type: AcademicYearScheduleType, dayRotation?: Maybe<{ __typename?: 'DayRotationSchedule', id: string }>, weekRotation?: Maybe<{ __typename?: 'WeekRotationSchedule', id: string, numOfWeek: number }> } }>, subject: { __typename?: 'Subject', id: string, name: string }, schedule: { __typename?: 'ClassSchedule', id: string, type: ClassScheduleType, oneOff?: Maybe<{ __typename?: 'OneOffSchedule', id: string, date: string, startTime: string, endTime: string }>, repeat?: Maybe<Array<{ __typename?: 'RepeatSchedule', id: string, startTime: string, endTime: string, repeatDays: Array<DayOfWeek>, startDate?: Maybe<string>, endDate?: Maybe<string>, rotationWeek?: Maybe<number> }>> } }> };

export type GetSubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSubjectsQuery = { __typename?: 'Query', getSubjects: Array<{ __typename?: 'Subject', id: string, name: string, academicYear?: Maybe<{ __typename?: 'AcademicYear', id: string }>, term?: Maybe<{ __typename?: 'Term', id: string }> }> };

export type GetTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTasksQuery = { __typename?: 'Query', getTasks: Array<{ __typename?: 'Task', id: string, title: string, detail: string, type: string, due_date: string, academicYear?: Maybe<{ __typename?: 'AcademicYear', id: string, startDate: string, endDate: string }>, subject: { __typename?: 'Subject', id: string, name: string } }> };

export type GetTasksByDateQueryVariables = Exact<{
  date: Scalars['DateTime'];
}>;


export type GetTasksByDateQuery = { __typename?: 'Query', getTasksByDate: Array<{ __typename?: 'Task', id: string, title: string, detail: string, type: string, due_date: string, academicYear?: Maybe<{ __typename?: 'AcademicYear', id: string, startDate: string, endDate: string }>, subject: { __typename?: 'Subject', id: string, name: string } }> };

export type LoginMutationVariables = Exact<{
  loginPassword: Scalars['String'];
  loginEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, username: string, email?: Maybe<string> } };

export type NewAcademicYearMutationVariables = Exact<{
  startDate: Scalars['String'];
  endDate: Scalars['String'];
}>;


export type NewAcademicYearMutation = { __typename?: 'Mutation', newAcademicYear: { __typename?: 'AcademicYear', id: string } };

export type NewAcademicYearScheduleMutationVariables = Exact<{
  type: AcademicYearScheduleType;
  academicYearId: Scalars['String'];
}>;


export type NewAcademicYearScheduleMutation = { __typename?: 'Mutation', newSchedule: { __typename?: 'AcademicYearSchedule', id: string } };

export type NewClassMutationVariables = Exact<{
  subjectId: Scalars['String'];
  module?: Maybe<Scalars['String']>;
  room?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  teacher?: Maybe<Scalars['String']>;
  academicYearId?: Maybe<Scalars['String']>;
}>;


export type NewClassMutation = { __typename?: 'Mutation', newClass: { __typename?: 'Class', id: string } };

export type NewClassScheduleMutationVariables = Exact<{
  classId: Scalars['String'];
  type: ClassScheduleType;
}>;


export type NewClassScheduleMutation = { __typename?: 'Mutation', newClassSchedule: { __typename?: 'ClassSchedule', id: string } };

export type NewOneOffScheduleMutationVariables = Exact<{
  scheduleId: Scalars['String'];
  date: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
}>;


export type NewOneOffScheduleMutation = { __typename?: 'Mutation', newOneOffSchedule: { __typename?: 'OneOffSchedule', id: string } };

export type NewPartialDayRotationMutationVariables = Exact<{
  startDay: Scalars['Int'];
  numOfDay: Scalars['Int'];
  repeatDays: Array<Scalars['Int']> | Scalars['Int'];
  scheduleId: Scalars['String'];
}>;


export type NewPartialDayRotationMutation = { __typename?: 'Mutation', newPartialDayRotation: { __typename?: 'DayRotationSchedule', id: string } };

export type NewPartialWeekRotationMutationVariables = Exact<{
  numOfWeek: Scalars['Int'];
  startWeek: Scalars['Int'];
  scheduleId: Scalars['String'];
}>;


export type NewPartialWeekRotationMutation = { __typename?: 'Mutation', newPartialWeekRotation: { __typename?: 'WeekRotationSchedule', id: string } };

export type NewRepeatScheduleMutationVariables = Exact<{
  scheduleId: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  repeatDays: Array<DayOfWeek> | DayOfWeek;
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  rotationWeek?: Maybe<Scalars['Int']>;
}>;


export type NewRepeatScheduleMutation = { __typename?: 'Mutation', newRepeatSchedule: { __typename?: 'RepeatSchedule', id: string } };

export type NewSubjectMutationVariables = Exact<{
  name: Scalars['String'];
  academicYearId?: Maybe<Scalars['String']>;
  termId?: Maybe<Scalars['String']>;
}>;


export type NewSubjectMutation = { __typename?: 'Mutation', newSubject: { __typename?: 'Subject', id: string } };

export type NewTaskMutationVariables = Exact<{
  subjectId: Scalars['String'];
  academicYearId?: Maybe<Scalars['String']>;
  type: TaskType;
  due_date: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
}>;


export type NewTaskMutation = { __typename?: 'Mutation', newTask: { __typename?: 'Task', id: string } };

export type NewTermMutationVariables = Exact<{
  name: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  academicYearId: Scalars['String'];
}>;


export type NewTermMutation = { __typename?: 'Mutation', newTerm: { __typename?: 'Term', id: string } };

export type RegisterMutationVariables = Exact<{
  registerPassword: Scalars['String'];
  registerEmail: Scalars['String'];
  registerUsername: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Maybe<boolean> };

export type UpdateClassMutationVariables = Exact<{
  id: Scalars['String'];
  subjectId: Scalars['String'];
  module?: Maybe<Scalars['String']>;
  room?: Maybe<Scalars['String']>;
  building?: Maybe<Scalars['String']>;
  teacher?: Maybe<Scalars['String']>;
  academicYearId?: Maybe<Scalars['String']>;
}>;


export type UpdateClassMutation = { __typename?: 'Mutation', updateClass: boolean };

export type UpdateOneOffScheduleMutationVariables = Exact<{
  id: Scalars['String'];
  scheduleId: Scalars['String'];
  date: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
}>;


export type UpdateOneOffScheduleMutation = { __typename?: 'Mutation', updateOneOffSchedule: boolean };

export type UpdateRepeatScheduleMutationVariables = Exact<{
  id: Scalars['String'];
  scheduleId: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  repeatDays: Array<DayOfWeek> | DayOfWeek;
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
}>;


export type UpdateRepeatScheduleMutation = { __typename?: 'Mutation', updateRepeatSchedule: boolean };

export type UpdateSubjectMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
  academicYearId?: Maybe<Scalars['String']>;
}>;


export type UpdateSubjectMutation = { __typename?: 'Mutation', updateSubject: boolean };

export type UpdateTaskMutationVariables = Exact<{
  id: Scalars['String'];
  subjectId: Scalars['String'];
  academicYearId?: Maybe<Scalars['String']>;
  type: TaskType;
  due_date: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: boolean };


export const DeleteAcademicYearDocument = gql`
    mutation DeleteAcademicYear($id: String!) {
  deleteAcademicYear(id: $id)
}
    `;
export type DeleteAcademicYearMutationFn = Apollo.MutationFunction<DeleteAcademicYearMutation, DeleteAcademicYearMutationVariables>;

/**
 * __useDeleteAcademicYearMutation__
 *
 * To run a mutation, you first call `useDeleteAcademicYearMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAcademicYearMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAcademicYearMutation, { data, loading, error }] = useDeleteAcademicYearMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAcademicYearMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAcademicYearMutation, DeleteAcademicYearMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAcademicYearMutation, DeleteAcademicYearMutationVariables>(DeleteAcademicYearDocument, options);
      }
export type DeleteAcademicYearMutationHookResult = ReturnType<typeof useDeleteAcademicYearMutation>;
export type DeleteAcademicYearMutationResult = Apollo.MutationResult<DeleteAcademicYearMutation>;
export type DeleteAcademicYearMutationOptions = Apollo.BaseMutationOptions<DeleteAcademicYearMutation, DeleteAcademicYearMutationVariables>;
export const DeleteClassDocument = gql`
    mutation DeleteClass($id: String!) {
  deleteClass(id: $id)
}
    `;
export type DeleteClassMutationFn = Apollo.MutationFunction<DeleteClassMutation, DeleteClassMutationVariables>;

/**
 * __useDeleteClassMutation__
 *
 * To run a mutation, you first call `useDeleteClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClassMutation, { data, loading, error }] = useDeleteClassMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteClassMutation(baseOptions?: Apollo.MutationHookOptions<DeleteClassMutation, DeleteClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteClassMutation, DeleteClassMutationVariables>(DeleteClassDocument, options);
      }
export type DeleteClassMutationHookResult = ReturnType<typeof useDeleteClassMutation>;
export type DeleteClassMutationResult = Apollo.MutationResult<DeleteClassMutation>;
export type DeleteClassMutationOptions = Apollo.BaseMutationOptions<DeleteClassMutation, DeleteClassMutationVariables>;
export const DeleteRepeatScheduleDocument = gql`
    mutation DeleteRepeatSchedule($id: String!) {
  deleteRepeatSchedule(id: $id)
}
    `;
export type DeleteRepeatScheduleMutationFn = Apollo.MutationFunction<DeleteRepeatScheduleMutation, DeleteRepeatScheduleMutationVariables>;

/**
 * __useDeleteRepeatScheduleMutation__
 *
 * To run a mutation, you first call `useDeleteRepeatScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRepeatScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRepeatScheduleMutation, { data, loading, error }] = useDeleteRepeatScheduleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRepeatScheduleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRepeatScheduleMutation, DeleteRepeatScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRepeatScheduleMutation, DeleteRepeatScheduleMutationVariables>(DeleteRepeatScheduleDocument, options);
      }
export type DeleteRepeatScheduleMutationHookResult = ReturnType<typeof useDeleteRepeatScheduleMutation>;
export type DeleteRepeatScheduleMutationResult = Apollo.MutationResult<DeleteRepeatScheduleMutation>;
export type DeleteRepeatScheduleMutationOptions = Apollo.BaseMutationOptions<DeleteRepeatScheduleMutation, DeleteRepeatScheduleMutationVariables>;
export const DeleteSubjectDocument = gql`
    mutation DeleteSubject($id: String!) {
  deleteSubject(id: $id)
}
    `;
export type DeleteSubjectMutationFn = Apollo.MutationFunction<DeleteSubjectMutation, DeleteSubjectMutationVariables>;

/**
 * __useDeleteSubjectMutation__
 *
 * To run a mutation, you first call `useDeleteSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubjectMutation, { data, loading, error }] = useDeleteSubjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSubjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubjectMutation, DeleteSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubjectMutation, DeleteSubjectMutationVariables>(DeleteSubjectDocument, options);
      }
export type DeleteSubjectMutationHookResult = ReturnType<typeof useDeleteSubjectMutation>;
export type DeleteSubjectMutationResult = Apollo.MutationResult<DeleteSubjectMutation>;
export type DeleteSubjectMutationOptions = Apollo.BaseMutationOptions<DeleteSubjectMutation, DeleteSubjectMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($id: String!) {
  deleteTask(id: $id)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const GetAcademicYearDocument = gql`
    query GetAcademicYear($id: String) {
  getAcademicYear(id: $id) {
    id
    startDate
    endDate
    schedule {
      type
      dayRotation {
        id
      }
      weekRotation {
        numOfWeek
        startWeek
      }
    }
  }
}
    `;

/**
 * __useGetAcademicYearQuery__
 *
 * To run a query within a React component, call `useGetAcademicYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAcademicYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAcademicYearQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAcademicYearQuery(baseOptions?: Apollo.QueryHookOptions<GetAcademicYearQuery, GetAcademicYearQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAcademicYearQuery, GetAcademicYearQueryVariables>(GetAcademicYearDocument, options);
      }
export function useGetAcademicYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAcademicYearQuery, GetAcademicYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAcademicYearQuery, GetAcademicYearQueryVariables>(GetAcademicYearDocument, options);
        }
export type GetAcademicYearQueryHookResult = ReturnType<typeof useGetAcademicYearQuery>;
export type GetAcademicYearLazyQueryHookResult = ReturnType<typeof useGetAcademicYearLazyQuery>;
export type GetAcademicYearQueryResult = Apollo.QueryResult<GetAcademicYearQuery, GetAcademicYearQueryVariables>;
export const GetAcademicYearsDocument = gql`
    query GetAcademicYears {
  getAcademicYears {
    id
    startDate
    endDate
    terms {
      id
      name
      startDate
      endDate
    }
    schedule {
      id
      type
      dayRotation {
        id
        numOfDay
        startDay
        repeatDays
      }
      weekRotation {
        id
        numOfWeek
        startWeek
      }
    }
  }
}
    `;

/**
 * __useGetAcademicYearsQuery__
 *
 * To run a query within a React component, call `useGetAcademicYearsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAcademicYearsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAcademicYearsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAcademicYearsQuery(baseOptions?: Apollo.QueryHookOptions<GetAcademicYearsQuery, GetAcademicYearsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAcademicYearsQuery, GetAcademicYearsQueryVariables>(GetAcademicYearsDocument, options);
      }
export function useGetAcademicYearsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAcademicYearsQuery, GetAcademicYearsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAcademicYearsQuery, GetAcademicYearsQueryVariables>(GetAcademicYearsDocument, options);
        }
export type GetAcademicYearsQueryHookResult = ReturnType<typeof useGetAcademicYearsQuery>;
export type GetAcademicYearsLazyQueryHookResult = ReturnType<typeof useGetAcademicYearsLazyQuery>;
export type GetAcademicYearsQueryResult = Apollo.QueryResult<GetAcademicYearsQuery, GetAcademicYearsQueryVariables>;
export const GetClassesDocument = gql`
    query GetClasses {
  getClasses {
    id
    building
    module
    room
    teacher
    academicYear {
      id
      startDate
      endDate
      schedule {
        type
        dayRotation {
          id
        }
        weekRotation {
          id
          numOfWeek
        }
      }
    }
    subject {
      id
      name
    }
    schedule {
      id
      type
      oneOff {
        id
        date
        startTime
        endTime
      }
      repeat {
        id
        startTime
        endTime
        repeatDays
        startDate
        endDate
        rotationWeek
      }
    }
  }
}
    `;

/**
 * __useGetClassesQuery__
 *
 * To run a query within a React component, call `useGetClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClassesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClassesQuery(baseOptions?: Apollo.QueryHookOptions<GetClassesQuery, GetClassesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClassesQuery, GetClassesQueryVariables>(GetClassesDocument, options);
      }
export function useGetClassesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClassesQuery, GetClassesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClassesQuery, GetClassesQueryVariables>(GetClassesDocument, options);
        }
export type GetClassesQueryHookResult = ReturnType<typeof useGetClassesQuery>;
export type GetClassesLazyQueryHookResult = ReturnType<typeof useGetClassesLazyQuery>;
export type GetClassesQueryResult = Apollo.QueryResult<GetClassesQuery, GetClassesQueryVariables>;
export const GetSubjectsDocument = gql`
    query GetSubjects {
  getSubjects {
    id
    name
    academicYear {
      id
    }
    term {
      id
    }
  }
}
    `;

/**
 * __useGetSubjectsQuery__
 *
 * To run a query within a React component, call `useGetSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSubjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSubjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSubjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetSubjectsQuery, GetSubjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSubjectsQuery, GetSubjectsQueryVariables>(GetSubjectsDocument, options);
      }
export function useGetSubjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSubjectsQuery, GetSubjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSubjectsQuery, GetSubjectsQueryVariables>(GetSubjectsDocument, options);
        }
export type GetSubjectsQueryHookResult = ReturnType<typeof useGetSubjectsQuery>;
export type GetSubjectsLazyQueryHookResult = ReturnType<typeof useGetSubjectsLazyQuery>;
export type GetSubjectsQueryResult = Apollo.QueryResult<GetSubjectsQuery, GetSubjectsQueryVariables>;
export const GetTasksDocument = gql`
    query GetTasks {
  getTasks {
    id
    title
    detail
    type
    due_date
    academicYear {
      id
      startDate
      endDate
    }
    subject {
      id
      name
    }
  }
}
    `;

/**
 * __useGetTasksQuery__
 *
 * To run a query within a React component, call `useGetTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
      }
export function useGetTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksQuery, GetTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksQuery, GetTasksQueryVariables>(GetTasksDocument, options);
        }
export type GetTasksQueryHookResult = ReturnType<typeof useGetTasksQuery>;
export type GetTasksLazyQueryHookResult = ReturnType<typeof useGetTasksLazyQuery>;
export type GetTasksQueryResult = Apollo.QueryResult<GetTasksQuery, GetTasksQueryVariables>;
export const GetTasksByDateDocument = gql`
    query GetTasksByDate($date: DateTime!) {
  getTasksByDate(date: $date) {
    id
    title
    detail
    type
    due_date
    academicYear {
      id
      startDate
      endDate
    }
    subject {
      id
      name
    }
  }
}
    `;

/**
 * __useGetTasksByDateQuery__
 *
 * To run a query within a React component, call `useGetTasksByDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTasksByDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTasksByDateQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetTasksByDateQuery(baseOptions: Apollo.QueryHookOptions<GetTasksByDateQuery, GetTasksByDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTasksByDateQuery, GetTasksByDateQueryVariables>(GetTasksByDateDocument, options);
      }
export function useGetTasksByDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTasksByDateQuery, GetTasksByDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTasksByDateQuery, GetTasksByDateQueryVariables>(GetTasksByDateDocument, options);
        }
export type GetTasksByDateQueryHookResult = ReturnType<typeof useGetTasksByDateQuery>;
export type GetTasksByDateLazyQueryHookResult = ReturnType<typeof useGetTasksByDateLazyQuery>;
export type GetTasksByDateQueryResult = Apollo.QueryResult<GetTasksByDateQuery, GetTasksByDateQueryVariables>;
export const LoginDocument = gql`
    mutation Login($loginPassword: String!, $loginEmail: String!) {
  login(password: $loginPassword, email: $loginEmail) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginPassword: // value for 'loginPassword'
 *      loginEmail: // value for 'loginEmail'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    username
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const NewAcademicYearDocument = gql`
    mutation NewAcademicYear($startDate: String!, $endDate: String!) {
  newAcademicYear(startDate: $startDate, endDate: $endDate) {
    id
  }
}
    `;
export type NewAcademicYearMutationFn = Apollo.MutationFunction<NewAcademicYearMutation, NewAcademicYearMutationVariables>;

/**
 * __useNewAcademicYearMutation__
 *
 * To run a mutation, you first call `useNewAcademicYearMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewAcademicYearMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newAcademicYearMutation, { data, loading, error }] = useNewAcademicYearMutation({
 *   variables: {
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useNewAcademicYearMutation(baseOptions?: Apollo.MutationHookOptions<NewAcademicYearMutation, NewAcademicYearMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewAcademicYearMutation, NewAcademicYearMutationVariables>(NewAcademicYearDocument, options);
      }
export type NewAcademicYearMutationHookResult = ReturnType<typeof useNewAcademicYearMutation>;
export type NewAcademicYearMutationResult = Apollo.MutationResult<NewAcademicYearMutation>;
export type NewAcademicYearMutationOptions = Apollo.BaseMutationOptions<NewAcademicYearMutation, NewAcademicYearMutationVariables>;
export const NewAcademicYearScheduleDocument = gql`
    mutation NewAcademicYearSchedule($type: AcademicYearScheduleType!, $academicYearId: String!) {
  newSchedule(type: $type, academicYearId: $academicYearId) {
    id
  }
}
    `;
export type NewAcademicYearScheduleMutationFn = Apollo.MutationFunction<NewAcademicYearScheduleMutation, NewAcademicYearScheduleMutationVariables>;

/**
 * __useNewAcademicYearScheduleMutation__
 *
 * To run a mutation, you first call `useNewAcademicYearScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewAcademicYearScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newAcademicYearScheduleMutation, { data, loading, error }] = useNewAcademicYearScheduleMutation({
 *   variables: {
 *      type: // value for 'type'
 *      academicYearId: // value for 'academicYearId'
 *   },
 * });
 */
export function useNewAcademicYearScheduleMutation(baseOptions?: Apollo.MutationHookOptions<NewAcademicYearScheduleMutation, NewAcademicYearScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewAcademicYearScheduleMutation, NewAcademicYearScheduleMutationVariables>(NewAcademicYearScheduleDocument, options);
      }
export type NewAcademicYearScheduleMutationHookResult = ReturnType<typeof useNewAcademicYearScheduleMutation>;
export type NewAcademicYearScheduleMutationResult = Apollo.MutationResult<NewAcademicYearScheduleMutation>;
export type NewAcademicYearScheduleMutationOptions = Apollo.BaseMutationOptions<NewAcademicYearScheduleMutation, NewAcademicYearScheduleMutationVariables>;
export const NewClassDocument = gql`
    mutation newClass($subjectId: String!, $module: String, $room: String, $building: String, $teacher: String, $academicYearId: String) {
  newClass(
    subjectId: $subjectId
    module: $module
    room: $room
    building: $building
    teacher: $teacher
    academicYearId: $academicYearId
  ) {
    id
  }
}
    `;
export type NewClassMutationFn = Apollo.MutationFunction<NewClassMutation, NewClassMutationVariables>;

/**
 * __useNewClassMutation__
 *
 * To run a mutation, you first call `useNewClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newClassMutation, { data, loading, error }] = useNewClassMutation({
 *   variables: {
 *      subjectId: // value for 'subjectId'
 *      module: // value for 'module'
 *      room: // value for 'room'
 *      building: // value for 'building'
 *      teacher: // value for 'teacher'
 *      academicYearId: // value for 'academicYearId'
 *   },
 * });
 */
export function useNewClassMutation(baseOptions?: Apollo.MutationHookOptions<NewClassMutation, NewClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewClassMutation, NewClassMutationVariables>(NewClassDocument, options);
      }
export type NewClassMutationHookResult = ReturnType<typeof useNewClassMutation>;
export type NewClassMutationResult = Apollo.MutationResult<NewClassMutation>;
export type NewClassMutationOptions = Apollo.BaseMutationOptions<NewClassMutation, NewClassMutationVariables>;
export const NewClassScheduleDocument = gql`
    mutation newClassSchedule($classId: String!, $type: ClassScheduleType!) {
  newClassSchedule(classId: $classId, type: $type) {
    id
  }
}
    `;
export type NewClassScheduleMutationFn = Apollo.MutationFunction<NewClassScheduleMutation, NewClassScheduleMutationVariables>;

/**
 * __useNewClassScheduleMutation__
 *
 * To run a mutation, you first call `useNewClassScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewClassScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newClassScheduleMutation, { data, loading, error }] = useNewClassScheduleMutation({
 *   variables: {
 *      classId: // value for 'classId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useNewClassScheduleMutation(baseOptions?: Apollo.MutationHookOptions<NewClassScheduleMutation, NewClassScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewClassScheduleMutation, NewClassScheduleMutationVariables>(NewClassScheduleDocument, options);
      }
export type NewClassScheduleMutationHookResult = ReturnType<typeof useNewClassScheduleMutation>;
export type NewClassScheduleMutationResult = Apollo.MutationResult<NewClassScheduleMutation>;
export type NewClassScheduleMutationOptions = Apollo.BaseMutationOptions<NewClassScheduleMutation, NewClassScheduleMutationVariables>;
export const NewOneOffScheduleDocument = gql`
    mutation newOneOffSchedule($scheduleId: String!, $date: String!, $startTime: String!, $endTime: String!) {
  newOneOffSchedule(
    scheduleId: $scheduleId
    date: $date
    startTime: $startTime
    endTime: $endTime
  ) {
    id
  }
}
    `;
export type NewOneOffScheduleMutationFn = Apollo.MutationFunction<NewOneOffScheduleMutation, NewOneOffScheduleMutationVariables>;

/**
 * __useNewOneOffScheduleMutation__
 *
 * To run a mutation, you first call `useNewOneOffScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewOneOffScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newOneOffScheduleMutation, { data, loading, error }] = useNewOneOffScheduleMutation({
 *   variables: {
 *      scheduleId: // value for 'scheduleId'
 *      date: // value for 'date'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *   },
 * });
 */
export function useNewOneOffScheduleMutation(baseOptions?: Apollo.MutationHookOptions<NewOneOffScheduleMutation, NewOneOffScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewOneOffScheduleMutation, NewOneOffScheduleMutationVariables>(NewOneOffScheduleDocument, options);
      }
export type NewOneOffScheduleMutationHookResult = ReturnType<typeof useNewOneOffScheduleMutation>;
export type NewOneOffScheduleMutationResult = Apollo.MutationResult<NewOneOffScheduleMutation>;
export type NewOneOffScheduleMutationOptions = Apollo.BaseMutationOptions<NewOneOffScheduleMutation, NewOneOffScheduleMutationVariables>;
export const NewPartialDayRotationDocument = gql`
    mutation NewPartialDayRotation($startDay: Int!, $numOfDay: Int!, $repeatDays: [Int!]!, $scheduleId: String!) {
  newPartialDayRotation(
    startDay: $startDay
    numOfDay: $numOfDay
    repeatDays: $repeatDays
    scheduleId: $scheduleId
  ) {
    id
  }
}
    `;
export type NewPartialDayRotationMutationFn = Apollo.MutationFunction<NewPartialDayRotationMutation, NewPartialDayRotationMutationVariables>;

/**
 * __useNewPartialDayRotationMutation__
 *
 * To run a mutation, you first call `useNewPartialDayRotationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewPartialDayRotationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newPartialDayRotationMutation, { data, loading, error }] = useNewPartialDayRotationMutation({
 *   variables: {
 *      startDay: // value for 'startDay'
 *      numOfDay: // value for 'numOfDay'
 *      repeatDays: // value for 'repeatDays'
 *      scheduleId: // value for 'scheduleId'
 *   },
 * });
 */
export function useNewPartialDayRotationMutation(baseOptions?: Apollo.MutationHookOptions<NewPartialDayRotationMutation, NewPartialDayRotationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewPartialDayRotationMutation, NewPartialDayRotationMutationVariables>(NewPartialDayRotationDocument, options);
      }
export type NewPartialDayRotationMutationHookResult = ReturnType<typeof useNewPartialDayRotationMutation>;
export type NewPartialDayRotationMutationResult = Apollo.MutationResult<NewPartialDayRotationMutation>;
export type NewPartialDayRotationMutationOptions = Apollo.BaseMutationOptions<NewPartialDayRotationMutation, NewPartialDayRotationMutationVariables>;
export const NewPartialWeekRotationDocument = gql`
    mutation NewPartialWeekRotation($numOfWeek: Int!, $startWeek: Int!, $scheduleId: String!) {
  newPartialWeekRotation(
    numOfWeek: $numOfWeek
    startWeek: $startWeek
    scheduleId: $scheduleId
  ) {
    id
  }
}
    `;
export type NewPartialWeekRotationMutationFn = Apollo.MutationFunction<NewPartialWeekRotationMutation, NewPartialWeekRotationMutationVariables>;

/**
 * __useNewPartialWeekRotationMutation__
 *
 * To run a mutation, you first call `useNewPartialWeekRotationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewPartialWeekRotationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newPartialWeekRotationMutation, { data, loading, error }] = useNewPartialWeekRotationMutation({
 *   variables: {
 *      numOfWeek: // value for 'numOfWeek'
 *      startWeek: // value for 'startWeek'
 *      scheduleId: // value for 'scheduleId'
 *   },
 * });
 */
export function useNewPartialWeekRotationMutation(baseOptions?: Apollo.MutationHookOptions<NewPartialWeekRotationMutation, NewPartialWeekRotationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewPartialWeekRotationMutation, NewPartialWeekRotationMutationVariables>(NewPartialWeekRotationDocument, options);
      }
export type NewPartialWeekRotationMutationHookResult = ReturnType<typeof useNewPartialWeekRotationMutation>;
export type NewPartialWeekRotationMutationResult = Apollo.MutationResult<NewPartialWeekRotationMutation>;
export type NewPartialWeekRotationMutationOptions = Apollo.BaseMutationOptions<NewPartialWeekRotationMutation, NewPartialWeekRotationMutationVariables>;
export const NewRepeatScheduleDocument = gql`
    mutation newRepeatSchedule($scheduleId: String!, $startTime: String!, $endTime: String!, $repeatDays: [DayOfWeek!]!, $startDate: String, $endDate: String, $rotationWeek: Int) {
  newRepeatSchedule(
    scheduleId: $scheduleId
    startTime: $startTime
    endTime: $endTime
    repeatDays: $repeatDays
    startDate: $startDate
    endDate: $endDate
    rotationWeek: $rotationWeek
  ) {
    id
  }
}
    `;
export type NewRepeatScheduleMutationFn = Apollo.MutationFunction<NewRepeatScheduleMutation, NewRepeatScheduleMutationVariables>;

/**
 * __useNewRepeatScheduleMutation__
 *
 * To run a mutation, you first call `useNewRepeatScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewRepeatScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newRepeatScheduleMutation, { data, loading, error }] = useNewRepeatScheduleMutation({
 *   variables: {
 *      scheduleId: // value for 'scheduleId'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *      repeatDays: // value for 'repeatDays'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      rotationWeek: // value for 'rotationWeek'
 *   },
 * });
 */
export function useNewRepeatScheduleMutation(baseOptions?: Apollo.MutationHookOptions<NewRepeatScheduleMutation, NewRepeatScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewRepeatScheduleMutation, NewRepeatScheduleMutationVariables>(NewRepeatScheduleDocument, options);
      }
export type NewRepeatScheduleMutationHookResult = ReturnType<typeof useNewRepeatScheduleMutation>;
export type NewRepeatScheduleMutationResult = Apollo.MutationResult<NewRepeatScheduleMutation>;
export type NewRepeatScheduleMutationOptions = Apollo.BaseMutationOptions<NewRepeatScheduleMutation, NewRepeatScheduleMutationVariables>;
export const NewSubjectDocument = gql`
    mutation NewSubject($name: String!, $academicYearId: String, $termId: String) {
  newSubject(name: $name, academicYearId: $academicYearId, termId: $termId) {
    id
  }
}
    `;
export type NewSubjectMutationFn = Apollo.MutationFunction<NewSubjectMutation, NewSubjectMutationVariables>;

/**
 * __useNewSubjectMutation__
 *
 * To run a mutation, you first call `useNewSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newSubjectMutation, { data, loading, error }] = useNewSubjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *      academicYearId: // value for 'academicYearId'
 *      termId: // value for 'termId'
 *   },
 * });
 */
export function useNewSubjectMutation(baseOptions?: Apollo.MutationHookOptions<NewSubjectMutation, NewSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewSubjectMutation, NewSubjectMutationVariables>(NewSubjectDocument, options);
      }
export type NewSubjectMutationHookResult = ReturnType<typeof useNewSubjectMutation>;
export type NewSubjectMutationResult = Apollo.MutationResult<NewSubjectMutation>;
export type NewSubjectMutationOptions = Apollo.BaseMutationOptions<NewSubjectMutation, NewSubjectMutationVariables>;
export const NewTaskDocument = gql`
    mutation NewTask($subjectId: String!, $academicYearId: String, $type: TaskType!, $due_date: String!, $title: String, $detail: String) {
  newTask(
    subjectId: $subjectId
    academicYearId: $academicYearId
    type: $type
    due_date: $due_date
    title: $title
    detail: $detail
  ) {
    id
  }
}
    `;
export type NewTaskMutationFn = Apollo.MutationFunction<NewTaskMutation, NewTaskMutationVariables>;

/**
 * __useNewTaskMutation__
 *
 * To run a mutation, you first call `useNewTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newTaskMutation, { data, loading, error }] = useNewTaskMutation({
 *   variables: {
 *      subjectId: // value for 'subjectId'
 *      academicYearId: // value for 'academicYearId'
 *      type: // value for 'type'
 *      due_date: // value for 'due_date'
 *      title: // value for 'title'
 *      detail: // value for 'detail'
 *   },
 * });
 */
export function useNewTaskMutation(baseOptions?: Apollo.MutationHookOptions<NewTaskMutation, NewTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewTaskMutation, NewTaskMutationVariables>(NewTaskDocument, options);
      }
export type NewTaskMutationHookResult = ReturnType<typeof useNewTaskMutation>;
export type NewTaskMutationResult = Apollo.MutationResult<NewTaskMutation>;
export type NewTaskMutationOptions = Apollo.BaseMutationOptions<NewTaskMutation, NewTaskMutationVariables>;
export const NewTermDocument = gql`
    mutation NewTerm($name: String!, $startDate: String!, $endDate: String!, $academicYearId: String!) {
  newTerm(
    name: $name
    startDate: $startDate
    endDate: $endDate
    academicYearId: $academicYearId
  ) {
    id
  }
}
    `;
export type NewTermMutationFn = Apollo.MutationFunction<NewTermMutation, NewTermMutationVariables>;

/**
 * __useNewTermMutation__
 *
 * To run a mutation, you first call `useNewTermMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewTermMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newTermMutation, { data, loading, error }] = useNewTermMutation({
 *   variables: {
 *      name: // value for 'name'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *      academicYearId: // value for 'academicYearId'
 *   },
 * });
 */
export function useNewTermMutation(baseOptions?: Apollo.MutationHookOptions<NewTermMutation, NewTermMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NewTermMutation, NewTermMutationVariables>(NewTermDocument, options);
      }
export type NewTermMutationHookResult = ReturnType<typeof useNewTermMutation>;
export type NewTermMutationResult = Apollo.MutationResult<NewTermMutation>;
export type NewTermMutationOptions = Apollo.BaseMutationOptions<NewTermMutation, NewTermMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerPassword: String!, $registerEmail: String!, $registerUsername: String!) {
  register(
    password: $registerPassword
    email: $registerEmail
    username: $registerUsername
  )
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerPassword: // value for 'registerPassword'
 *      registerEmail: // value for 'registerEmail'
 *      registerUsername: // value for 'registerUsername'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdateClassDocument = gql`
    mutation UpdateClass($id: String!, $subjectId: String!, $module: String, $room: String, $building: String, $teacher: String, $academicYearId: String) {
  updateClass(
    id: $id
    subjectId: $subjectId
    module: $module
    room: $room
    building: $building
    teacher: $teacher
    academicYearId: $academicYearId
  )
}
    `;
export type UpdateClassMutationFn = Apollo.MutationFunction<UpdateClassMutation, UpdateClassMutationVariables>;

/**
 * __useUpdateClassMutation__
 *
 * To run a mutation, you first call `useUpdateClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClassMutation, { data, loading, error }] = useUpdateClassMutation({
 *   variables: {
 *      id: // value for 'id'
 *      subjectId: // value for 'subjectId'
 *      module: // value for 'module'
 *      room: // value for 'room'
 *      building: // value for 'building'
 *      teacher: // value for 'teacher'
 *      academicYearId: // value for 'academicYearId'
 *   },
 * });
 */
export function useUpdateClassMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClassMutation, UpdateClassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClassMutation, UpdateClassMutationVariables>(UpdateClassDocument, options);
      }
export type UpdateClassMutationHookResult = ReturnType<typeof useUpdateClassMutation>;
export type UpdateClassMutationResult = Apollo.MutationResult<UpdateClassMutation>;
export type UpdateClassMutationOptions = Apollo.BaseMutationOptions<UpdateClassMutation, UpdateClassMutationVariables>;
export const UpdateOneOffScheduleDocument = gql`
    mutation UpdateOneOffSchedule($id: String!, $scheduleId: String!, $date: String!, $startTime: String!, $endTime: String!) {
  updateOneOffSchedule(
    id: $id
    scheduleId: $scheduleId
    date: $date
    startTime: $startTime
    endTime: $endTime
  )
}
    `;
export type UpdateOneOffScheduleMutationFn = Apollo.MutationFunction<UpdateOneOffScheduleMutation, UpdateOneOffScheduleMutationVariables>;

/**
 * __useUpdateOneOffScheduleMutation__
 *
 * To run a mutation, you first call `useUpdateOneOffScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneOffScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneOffScheduleMutation, { data, loading, error }] = useUpdateOneOffScheduleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      scheduleId: // value for 'scheduleId'
 *      date: // value for 'date'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *   },
 * });
 */
export function useUpdateOneOffScheduleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneOffScheduleMutation, UpdateOneOffScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneOffScheduleMutation, UpdateOneOffScheduleMutationVariables>(UpdateOneOffScheduleDocument, options);
      }
export type UpdateOneOffScheduleMutationHookResult = ReturnType<typeof useUpdateOneOffScheduleMutation>;
export type UpdateOneOffScheduleMutationResult = Apollo.MutationResult<UpdateOneOffScheduleMutation>;
export type UpdateOneOffScheduleMutationOptions = Apollo.BaseMutationOptions<UpdateOneOffScheduleMutation, UpdateOneOffScheduleMutationVariables>;
export const UpdateRepeatScheduleDocument = gql`
    mutation UpdateRepeatSchedule($id: String!, $scheduleId: String!, $startTime: String!, $endTime: String!, $repeatDays: [DayOfWeek!]!, $startDate: String, $endDate: String) {
  updateRepeatSchedule(
    id: $id
    scheduleId: $scheduleId
    startTime: $startTime
    endTime: $endTime
    repeatDays: $repeatDays
    startDate: $startDate
    endDate: $endDate
  )
}
    `;
export type UpdateRepeatScheduleMutationFn = Apollo.MutationFunction<UpdateRepeatScheduleMutation, UpdateRepeatScheduleMutationVariables>;

/**
 * __useUpdateRepeatScheduleMutation__
 *
 * To run a mutation, you first call `useUpdateRepeatScheduleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRepeatScheduleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRepeatScheduleMutation, { data, loading, error }] = useUpdateRepeatScheduleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      scheduleId: // value for 'scheduleId'
 *      startTime: // value for 'startTime'
 *      endTime: // value for 'endTime'
 *      repeatDays: // value for 'repeatDays'
 *      startDate: // value for 'startDate'
 *      endDate: // value for 'endDate'
 *   },
 * });
 */
export function useUpdateRepeatScheduleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRepeatScheduleMutation, UpdateRepeatScheduleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRepeatScheduleMutation, UpdateRepeatScheduleMutationVariables>(UpdateRepeatScheduleDocument, options);
      }
export type UpdateRepeatScheduleMutationHookResult = ReturnType<typeof useUpdateRepeatScheduleMutation>;
export type UpdateRepeatScheduleMutationResult = Apollo.MutationResult<UpdateRepeatScheduleMutation>;
export type UpdateRepeatScheduleMutationOptions = Apollo.BaseMutationOptions<UpdateRepeatScheduleMutation, UpdateRepeatScheduleMutationVariables>;
export const UpdateSubjectDocument = gql`
    mutation UpdateSubject($id: String!, $name: String!, $academicYearId: String) {
  updateSubject(id: $id, name: $name, academicYearId: $academicYearId)
}
    `;
export type UpdateSubjectMutationFn = Apollo.MutationFunction<UpdateSubjectMutation, UpdateSubjectMutationVariables>;

/**
 * __useUpdateSubjectMutation__
 *
 * To run a mutation, you first call `useUpdateSubjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubjectMutation, { data, loading, error }] = useUpdateSubjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      academicYearId: // value for 'academicYearId'
 *   },
 * });
 */
export function useUpdateSubjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSubjectMutation, UpdateSubjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSubjectMutation, UpdateSubjectMutationVariables>(UpdateSubjectDocument, options);
      }
export type UpdateSubjectMutationHookResult = ReturnType<typeof useUpdateSubjectMutation>;
export type UpdateSubjectMutationResult = Apollo.MutationResult<UpdateSubjectMutation>;
export type UpdateSubjectMutationOptions = Apollo.BaseMutationOptions<UpdateSubjectMutation, UpdateSubjectMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($id: String!, $subjectId: String!, $academicYearId: String, $type: TaskType!, $due_date: String!, $title: String, $detail: String) {
  updateTask(
    id: $id
    subjectId: $subjectId
    academicYearId: $academicYearId
    type: $type
    due_date: $due_date
    title: $title
    detail: $detail
  )
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *      subjectId: // value for 'subjectId'
 *      academicYearId: // value for 'academicYearId'
 *      type: // value for 'type'
 *      due_date: // value for 'due_date'
 *      title: // value for 'title'
 *      detail: // value for 'detail'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;