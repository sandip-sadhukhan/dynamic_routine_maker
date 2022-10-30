import { gql } from "@apollo/client"
import client from "../constants/apollo-client-server-config"

export interface IRoutine {
  slug: string
}

export interface IData {
  allPublicRoutines: IRoutine[]
}

const GET_ALL_PUBLIC_ROUTINES = gql`
  query {
    allPublicRoutines {
      slug
    }
  }
`

const useGetAllPublicRoutines = () => {
  return client.query<IData>({
    query: GET_ALL_PUBLIC_ROUTINES,
  })
}

export default useGetAllPublicRoutines
