export var registerMutation = "\n    mutation(\n        $password: String!\n        $email: String!\n        $username: String!\n    ) {\n        register(\n            password: $password\n            email: $email\n            username: $username\n        )\n    }\n";
export var loginMutation = "\n    mutation ($password: String!, $email: String!) {\n        login(password: $password, email: $email) {\n            accessToken\n        }\n    }\n";
//# sourceMappingURL=auth.js.map