import { gql } from "@apollo/client"
import client from "../constants/apollo-client-server-config"

export interface IClass {
  id: string
  subject: string
  teacherShortName: string
  startTime: string
  endTime: string
}

export interface IRoutine {
  name: string
  allClasses: {
    sunday: IClass[]
    monday: IClass[]
    tuesday: IClass[]
    wednesday: IClass[]
    thursday: IClass[]
    friday: IClass[]
    saturday: IClass[]
  }
}

export interface IData {
  publicRoutine: IRoutine
}

interface IVariable {
  slug: string
}

const GET_PUBLIC_ROUTINE = gql`
  query ($slug: String!) {
    publicRoutine(slug: $slug) {
      name
      allClasses {
        sunday {
          id
          subject
          teacherShortName
          startTime
          endTime
        }
        monday {
          id
          subject
          teacherShortName
          startTime
          endTime
        }
        tuesday {
          id
          subject
          teacherShortName
          startTime
          endTime
        }
        wednesday {
          id
          subject
          teacherShortName
          startTime
          endTime
        }
        thursday {
          id
          subject
          teacherShortName
          startTime
          endTime
        }
        friday {
          id
          subject
          teacherShortName
          startTime
          endTime
        }
        saturday {
          id
          subject
          teacherShortName
          startTime
          endTime
        }
      }
    }
  }
`

const useGetPublicRoutine = (slug: string) => {
  return client.query<IData, IVariable>({
    query: GET_PUBLIC_ROUTINE,
    variables: { slug },
  })
}

export default useGetPublicRoutine
