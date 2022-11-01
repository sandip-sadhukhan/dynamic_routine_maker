import {
  Box,
  Container,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Link from "next/link"
import React from "react"

const Footer: React.FC = () => {
  const textColor = useColorModeValue(
    "blackAlpha.500",
    "whiteAlpha.500"
  )
  return (
    <Box py={5} mb={0} w="full">
      <Container maxW="container.xl" centerContent>
        <Text color={textColor} textAlign="center">
          Created by{" "}
          <Link href="/">Dynamic Routine Maker</Link> | All
          rights reserved
        </Text>
      </Container>
    </Box>
  )
}

export default Footer
