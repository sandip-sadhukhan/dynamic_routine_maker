import { useReactiveVar } from "@apollo/client"
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import globalErrors from "../constants/global-errors"
import useGetMe from "../hooks/useGetMe"

interface GuardProps {
  children: JSX.Element
  excludedRoutes?: string[]
  publicRoute: string
}

const Guard = ({
  children,
  excludedRoutes,
  publicRoute,
}: GuardProps) => {
  const router = useRouter()
  const toast = useToast()
  const [getMe, { data: user, loading, error, called }] =
    useGetMe()
  const errors = useReactiveVar(globalErrors)

  useEffect(() => {
    if (!router.pathname.startsWith(publicRoute)) {
      getMe()
    }
  }, [])

  useEffect(() => {
    if (
      !called ||
      loading ||
      router.pathname.startsWith(publicRoute)
    )
      return

    if (error && localStorage.getItem("token")) {
      toast({
        title: `Please Login/Signup to continue`,
        status: "error",
        isClosable: true,
      })
      localStorage.removeItem("token")
    }

    if (!user) {
      localStorage.removeItem("token")
    }

    if (router.pathname === "/" && user) {
      router.push("/dashboard")
    }

    if (
      !user &&
      !excludedRoutes?.includes(router.pathname)
    ) {
      router.push("/")
    }
  }, [user, loading, error])

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((error) => {
        toast({
          title: `${error}`,
          status: "error",
          isClosable: true,
        })
      })
    }
  }, [errors])

  return (
    <>
      {(!router.pathname.startsWith(publicRoute) &&
        !user &&
        !excludedRoutes?.includes(router.pathname)) ||
      loading ? (
        <></>
      ) : (
        children
      )}
    </>
  )
}
export default Guard
