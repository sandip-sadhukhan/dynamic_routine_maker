import { gql, useMutation } from "@apollo/client"

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
  updateRoutine: {
    routine: IRoutine
  }
}

interface IVariable {
  id: string
  name: string
}

const UPDATE_ROUTINE = gql`
  mutation ($id: String!, $name: String!) {
    updateRoutine(id: $id, name: $name) {
      routine {
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
  }
`

const useUpdateRoutine = () => {
  return useMutation<IData, IVariable>(UPDATE_ROUTINE)
}

export default useUpdateRoutine
