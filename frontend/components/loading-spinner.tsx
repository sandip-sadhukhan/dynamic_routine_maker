import { Center } from "@chakra-ui/react"
import Image from "next/image"
import React from "react"

const LoadingSpinner: React.FC = () => {
  return (
    <Center h="100vh">
      <Image
        src="/loading-thinking.gif"
        alt="Loading..."
        height={250}
        width={250}
      />
    </Center>
  )
}

export default LoadingSpinner
