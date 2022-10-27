import { gql, useMutation } from "@apollo/client"

interface IData {
  deleteRoutine: {
    success: boolean
  }
}

interface IVariables {
  id: string
}

const ROUTINE_DELETE = gql`
  mutation ($id: String!) {
    deleteRoutine(id: $id) {
      success
    }
  }
`

const useRoutineDelete = () => {
  return useMutation<IData, IVariables>(ROUTINE_DELETE)
}

export default useRoutineDelete
