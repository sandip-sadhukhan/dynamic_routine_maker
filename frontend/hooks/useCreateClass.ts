import { gql, useMutation } from "@apollo/client"

interface IData {
  id: string
}

interface IVariable {
  day: string
  routineId: string
  subject: string
  teacherShortName: string
  startTime: string
  endTime: string
}

const CREATE_CLASS = gql`
  mutation (
    $day: String!
    $routineId: String!
    $subject: String!
    $teacherShortName: String!
    $startTime: String!
    $endTime: String!
  ) {
    createClass(
      day: $day
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

const useCreateClass = () => {
  return useMutation<IData, IVariable>(CREATE_CLASS)
}

export default useCreateClass
