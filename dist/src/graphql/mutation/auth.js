"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginMutation = exports.registerMutation = void 0;
exports.registerMutation = `
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
exports.loginMutation = `
    mutation ($password: String!, $email: String!) {
        login(password: $password, email: $email) {
            accessToken
        }
    }
`;
//# sourceMappingURL=auth.js.map