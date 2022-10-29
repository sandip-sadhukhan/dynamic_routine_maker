import { gql, useQuery } from "@apollo/client"

export interface IGetClass {
  id: string
  subject: string
  teacherShortName: string
  startTime: string
  endTime: string
}

export interface IRoutine {
  name: string
  slug: string
  classes: IGetClass[]
}

export interface IData {
  routineById: IRoutine
}

interface IVariable {
  id: string
  day: string
}

const GET_ROUTINE = gql`
  query ($id: String!, $day: String!) {
    routineById(id: $id) {
      name
      slug
      classes(day: $day) {
        id
        subject
        teacherShortName
        startTime
        endTime
      }
    }
  }
`

const useGetClasses = (id: string, day: string) => {
  return useQuery<IData, IVariable>(GET_ROUTINE, {
    variables: { id, day },
  })
}

export default useGetClasses
