export const registerMutation = `
    mutation RegisterMutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password){
            id
            username
            email
        }
    }
`;

export const loginMutation = `
    mutation LoginMutation($email: String!, $password: String!){
      login(email: $email, password: $password){
        accessToken
        user {
          id
          username
          email
          provider
        }
      }
    }
`;
