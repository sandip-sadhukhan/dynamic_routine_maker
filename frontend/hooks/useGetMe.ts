import { gql, useLazyQuery } from "@apollo/client"

const GET_ME = gql`
  query {
    getMe {
      id
      email
    }
  }
`

const useGetMe = () => {
  return useLazyQuery(GET_ME)
}

export default useGetMe
