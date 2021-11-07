const newTermMutation = `
    mutation(
        $name: String!,
        $startDate: String!,
        $endDate: String!,
        $academicYearId: String!
    ){
        newTerm(
            name: $name,
            startDate: $startDate,
            endDate: $endDate,
            academicYearId: $academicYearId
        )
            {
                id
            }
    }
`;
export { newTermMutation };
//# sourceMappingURL=term.js.map