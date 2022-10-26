import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import Head from "next/head"

function MyApp({ Component, pageProps }: AppProps) {
  const httpLink = createHttpLink({
    uri: "/graphql",
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token")
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `JWT ${token}` : "",
      },
    }
  })
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Head>
          <title>
            Dynamic Routine Maker | Make your routine
            digital
          </title>
          <meta
            name="description"
            content="In this website, you can create your routine and share it with your classmate"
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default MyApp
