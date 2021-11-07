export const registerMutation = `
    mutation(
        $password: String!
        $email: String!
        $username: String!
    ) {
        register(
            password: $password
            email: $email
            username: $username
        )
    }
`;
export const loginMutation = `
    mutation ($password: String!, $email: String!) {
        login(password: $password, email: $email) {
            accessToken
        }
    }
`;
//# sourceMappingURL=auth.js.map