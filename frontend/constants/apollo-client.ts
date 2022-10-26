import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client"
import { onError } from "@apollo/client/link/error"
import { setContext } from "@apollo/client/link/context"
import { API_URL } from "./urls"
import globalErrors from "./global-errors"

const IGNORE_PATHS: (string | number)[] = ["getMe"]

const httpLink = new HttpLink({
  uri: `${API_URL}/graphql/`,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  }
})

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    const errors: string[] = []
    if (graphQLErrors) {
      graphQLErrors.forEach((err) => {
        if (
          !(err.path && IGNORE_PATHS.includes(err.path[0]))
        ) {
          errors.push(err.message)
        }
      })
    }
    globalErrors(errors as never[])
  }
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(errorLink).concat(httpLink),
})

export default client
