// import { ValidationError } from "apollo-server-errors";
// import { Subject, AcademicYear, User, AcademicYearTerm } from "src/entity";
// import { Context } from "src/interface";
// import { Args, Ctx, Mutation, Resolver } from "type-graphql";
// import { getConnection } from "typeorm";
// import { SubjectObjectType } from "./types";
// import { createNewSubjectArgs } from "./types/subject";

// @Resolver()
// export class SubjectResolver {
//   @Mutation(() => SubjectObjectType)
//   async createNewSubject(
//     @Args() { name, academicYearId, academicTermId }: createNewSubjectArgs,
//     @Ctx() { user }: Context
//   ) {
//     /**
//      * repository
//      */
//     const subjectRepository = await getConnection(
//       process.env.NODE_ENV
//     ).getRepository(Subject);
//     const academicYearRepository = await getConnection(
//       process.env.NODE_ENV
//     ).getRepository(AcademicYear);
//     const userRepository = await getConnection(
//       process.env.NODE_ENV
//     ).getRepository(User);
//     const academicYearTermRepository = await getConnection(
//       process.env.NODE_ENV
//     ).getRepository(AcademicYearTerm);

//     const partialSubject = subjectRepository.create({
//       name: name,
//     });
//     const newSubject = await subjectRepository.save(partialSubject);
//     if (academicYearId) {
//       const qAcademicYear = await academicYearRepository.findOne(
//         academicYearId,
//         {
//           relations: ["subjects", "terms"],
//         }
//       );
//       if (!qAcademicYear) throw new ValidationError("invalid academic year id");
//       const qTerm = await academicYearTermRepository.findOne(academicTermId);
//       if (!qTerm) throw new ValidationError("invalid academic year term id");
//       const validTerm = qAcademicYear?.terms.some(
//         (term) => term.id === qTerm.id
//       );
//       if (!validTerm)
//         throw new ValidationError(
//           `term does not belong to the given academic year (${qAcademicYear.startDate} - ${qAcademicYear.endDate})`
//         );
//       qAcademicYear.subjects.push(newSubject);
//       qTerm.subjects.push(newSubject);
//       await academicYearRepository.save(qAcademicYear);
//       await academicYearTermRepository.save(qTerm);
//     }
//     const currentUser = (await userRepository.findOne(user!.id, {
//       relations: ["subjects"],
//     })) as User;
//     currentUser.subjects.push(newSubject);
//     await userRepository.save(currentUser);
//     return newSubject;
//   }
// }
