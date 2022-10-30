import { Center } from "@chakra-ui/react"
import Image from "next/image"
import React from "react"

const NotFound: React.FC = () => {
  return (
    <Center h="100vh">
      <Image
        src="/404.gif"
        alt="Loading..."
        height={200}
        width={300}
      />
    </Center>
  )
}

export default NotFound
