export const createNewAcademicYearMutation = `
    mutation createNewAcademicYearMutation(
        $startDate: String!,
        $endDate: String!,
        $schedulingType: schedulingType!,
        $terms: [AcademicYearTermInputType!],
        $dayRotationSchedules: AcademicYearDayRotationScheduleInputType,
        $weekRotationSchedule: AcademicYearWeekRotationScheduleInputType
        ) {
        createNewAcademicYear(
            startDate: $startDate,
            endDate: $endDate,
            schedulingType: $schedulingType,
            terms: $terms,
            dayRotationSchedules: $dayRotationSchedules,
            weekRotationSchedule: $weekRotationSchedule
            ){
                id
        }
    }
`;
