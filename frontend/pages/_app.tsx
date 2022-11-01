import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import { ApolloProvider } from "@apollo/client"
import Head from "next/head"
import client from "../constants/apollo-client"
import Guard from "../components/guard"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Guard excludedRoutes={["/"]} publicRoute={"/r/"}>
          <>
            <Head>
              <meta
                name="description"
                content="In this website, you can create your routine and share it with your classmate"
              />
              <link rel="icon" href="/favicon.png" />
            </Head>
            <Component {...pageProps} />
          </>
        </Guard>
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default MyApp
