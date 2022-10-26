import { gql, useMutation } from "@apollo/client"

interface IVariables {
  name: string
}

interface IData {
  createRoutine: {
    routine: {
      id: string
    }
  }
}

const CREATE_ROUTINE = gql`
  mutation ($name: String!) {
    createRoutine(name: $name) {
      routine {
        id
      }
    }
  }
`

const useCreateRoutine = () => {
  return useMutation<IData, IVariables>(CREATE_ROUTINE)
}

export default useCreateRoutine
