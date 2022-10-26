import { gql, useMutation } from "@apollo/client"

interface CreateUserInput {
  email: string
  password: string
}

interface User {
  id: string
  email: string
}

const CREATE_USER = gql`
  mutation ($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      user {
        id
        email
      }
    }
  }
`
const useCreateUser = () => {
  return useMutation<User, CreateUserInput>(CREATE_USER)
}

export default useCreateUser
