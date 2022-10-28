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
  sundayClasses: IGetClass[]
}

export interface IData {
  routineById: IRoutine
}

interface IVariable {
  id: string
}

const GET_ROUTINE = gql`
  query ($id: String!) {
    routineById(id: $id) {
      name
      slug
      sundayClasses {
        id
        subject
        teacherShortName
        startTime
        endTime
      }
    }
  }
`

const useGetClasses = (id: string) => {
  return useQuery<IData, IVariable>(GET_ROUTINE, {
    variables: { id },
  })
}

export default useGetClasses
