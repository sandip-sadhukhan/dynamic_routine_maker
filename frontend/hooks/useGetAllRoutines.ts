import { gql, useQuery } from "@apollo/client"

export interface IRoutine {
  id: string
  name: string
  slug: string
}

interface IRoutineWrapper {
  routines: IRoutine[]
}

const GET_ALL_ROUTINES = gql`
  query {
    routines {
      id
      name
      slug
    }
  }
`

const useGetAllRoutines = () => {
  return useQuery<IRoutineWrapper>(GET_ALL_ROUTINES)
}

export default useGetAllRoutines
