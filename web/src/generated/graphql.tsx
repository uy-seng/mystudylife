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
  type: Scalars['String'];
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
};

export type ClassSchedule = {
  __typename?: 'ClassSchedule';
  id: Scalars['String'];
  type: Scalars['String'];
};

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

export type Query = {
  __typename?: 'Query';
  me: User;
  getAcademicYears: Array<AcademicYear>;
};

export type Subject = {
  __typename?: 'Subject';
  id: Scalars['String'];
  name: Scalars['String'];
};

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

export type GetAcademicYearsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAcademicYearsQuery = { __typename?: 'Query', getAcademicYears: Array<{ __typename?: 'AcademicYear', id: string, startDate: string, endDate: string, terms: Array<{ __typename?: 'Term', id: string, name: string, startDate: string, endDate: string }>, schedule: { __typename?: 'AcademicYearSchedule', id: string, type: string, dayRotation?: Maybe<{ __typename?: 'DayRotationSchedule', id: string, numOfDay: number, startDay: number, repeatDays: Array<number> }>, weekRotation?: Maybe<{ __typename?: 'WeekRotationSchedule', id: string, numOfWeek: number, startWeek: number }> } }> };

export type LoginMutationVariables = Exact<{
  loginPassword: Scalars['String'];
  loginEmail: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string } };

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