import { gql, useMutation } from "@apollo/client"

interface IData {
  deleteClass: {
    success: boolean
  }
}

interface IVariable {
  id: string
  routineId: string
}

const CLASS_DELETE = gql`
  mutation ($id: String!, $routineId: String!) {
    deleteClass(id: $id, routineId: $routineId) {
      success
    }
  }
`

const useClassDelete = () => {
  return useMutation<IData, IVariable>(CLASS_DELETE)
}

export default useClassDelete
