import { gql, useMutation } from "@apollo/client"

interface IData {
  updateClass: {
    classObj: {
      id: string
    }
  }
}

interface IVariable {
  id: string
  routineId: string
  subject: string
  teacherShortName: string
  startTime: string
  endTime: string
}

const UPDATE_CLASS = gql`
  mutation (
    $id: String!
    $routineId: String!
    $subject: String!
    $teacherShortName: String!
    $startTime: String!
    $endTime: String!
  ) {
    updateClass(
      id: $id
      routineId: $routineId
      subject: $subject
      teacherShortName: $teacherShortName
      startTime: $startTime
      endTime: $endTime
    ) {
      classObj {
        id
      }
    }
  }
`

const useUpdateClass = () => {
  return useMutation<IData, IVariable>(UPDATE_CLASS)
}

export default useUpdateClass
