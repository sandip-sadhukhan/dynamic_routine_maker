import { gql, useMutation } from "@apollo/client"

interface loginUserInput {
  email: string
  password: string
}

interface loginUserOutput {
  tokenAuth: {
    token: string
  }
}

const LOGIN_USER = gql`
  mutation ($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`

const useLoginUser = () => {
  return useMutation<loginUserOutput, loginUserInput>(
    LOGIN_USER
  )
}

export default useLoginUser
