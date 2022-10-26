import {
  Box,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Image from "next/image"
import React from "react"

const HowToUseBox: React.FC = () => {
  const boxBg = useColorModeValue("blue.50", "gray.700")

  return (
    <Box shadow="base" bg={boxBg} p={10} rounded="base">
      <Image
        src="/hero-image.svg"
        alt="Hero Image"
        height="200px"
        width="300px"
      />
      <Heading
        as="h3"
        fontSize="2xl"
        textAlign="center"
        mb={4}
      >
        SignUp
      </Heading>
      <Text textAlign="justify" color="gray.500">
        Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Aliquid, similique.
      </Text>
    </Box>
  )
}

export default HowToUseBox
