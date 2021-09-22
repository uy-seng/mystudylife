// import { testClient } from "test/graphqlTestClient";
// import faker from "faker";

// const testUser = {
//   username: faker.internet.userName(),
//   email: faker.internet.email(),
//   password: faker.internet.password(),
// };

// const registerMutation = `
//     mutation RegisterMutation($username: String!, $email: String!, $password: String!) {
//         register(username: $username, email: $email, password: $password)
//     }
// `;

// const loginMutation = `
//     mutation LoginMutation($email: String!, $password: String!){
//       login(email: $email, password: $password){
//         accessToken
//       }
//     }
// `;

// let accessToken: string;

// describe("user authentication process", () => {
//   it("should register user", async () => {
//     const response = await testClient({
//       source: registerMutation,
//       variableValues: {
//         username: testUser.username,
//         email: testUser.email,
//         password: testUser.password,
//       },
//     });
//     expect(response.errors).toBeUndefined();
//     expect(response.data!.register).not.toBeNull();
//   });

//   it("should login user", async () => {
//     const response = await testClient({
//       source: loginMutation,
//       variableValues: {
//         email: testUser.email,
//         password: testUser.password,
//       },
//     });
//     expect(response.errors).toBeUndefined();
//     expect(response.data!.login).not.toBeNull();
//     accessToken = response.data!.login!.accessToken;
//     expect(accessToken).toBeDefined();
//   });

//   it("user should now be authenticated", () => {
//     expect(accessToken).toBeDefined();
//   });
// });

// const createNewAcademicYearMutation = `
//     mutation CreateNewAcademicYearMutation(
//         $startDate: String!,
//         $endDate: String!,
//         $schedulingType: schedulingType!,
//         $terms: [AcademicYearTermInputType!],
//         $dayRotationSchedule: AcademicYearDayRotationScheduleInputType,
//         $weekRotationSchedule: AcademicYearWeekRotationScheduleInputType
//         ) {
//         createNewAcademicYear(
//             startDate: $startDate,
//             endDate: $endDate,
//             schedulingType: $schedulingType,
//             terms: $terms,
//             dayRotationSchedule: $dayRotationSchedule,
//             weekRotationSchedule: $weekRotationSchedule
//             ){
//                 id
//         }
//     }
// `;

// // let academicYearId: AcademicYear;
// describe("creating mock academic year", () => {
//   it("should create academic year with fixed schedule", async () => {
//     const response = await testClient({
//       source: createNewAcademicYearMutation,
//       variableValues: {
//         startDate: "September 10, 2030",
//         endDate: "September 10, 2031",
//         schedulingType: "fixed",
//         terms: [
//           {
//             name: "Winter",
//             startDate: "September 10, 2030",
//             endDate: "October 10, 2031",
//           },
//           {
//             name: "Spring",
//             startDate: "October 25, 2030",
//             endDate: "November 25, 2031",
//           },
//           {
//             name: "Autumn",
//             startDate: "December 10, 2030",
//             endDate: "Janurary 10, 2031",
//           },
//         ],
//         dayRotationSchedule: null,
//         weekRotationSchedule: null,
//       },
//       headers: {
//         authorization: `Bearer ${accessToken}`,
//       },
//     });
//     expect(response.errors).toBeUndefined();
//     expect(response.data!.createNewAcademicYear).not.toBeNull();
//   });
// });

// // const createNewSubjectMutation = `
// //   mutation CreateNewSubjectMutation(
// //     $name: String!,
// //     $academicYearId: String,
// //     $academicTermId: String
// //   ){
// //     createNewSubject(
// //       name: $name,
// //       academicYearId: $academicYearId,
// //       academicTermId: $academicTermId
// //     ){
// //       id
// //     }
// //   }

// // `;
// describe("subject resolver functionality test", () => {
//   it("should create new subject", () => {});
//   it("should return all subjects", () => {});
//   it("should return subject for specific academic year", () => {});
// });

// describe("subject resolver specification test", () => {});
