import { gql, useQuery } from "@apollo/client"

export interface IGetClassCount {
  sunday: number
  monday: number
  tuesday: number
  wednesday: number
  thursday: number
  friday: number
  saturday: number
}

export interface IRoutine {
  name: string
  slug: string
  getClassesCount: IGetClassCount
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
      getClassesCount {
        sunday
        monday
        tuesday
        wednesday
        thursday
        friday
        saturday
      }
    }
  }
`

const useGetRoutine = (id: string) => {
  return useQuery<IData, IVariable>(GET_ROUTINE, {
    variables: { id },
  })
}

export default useGetRoutine
