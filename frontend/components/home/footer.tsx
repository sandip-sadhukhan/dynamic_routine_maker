import { Box, Container, Text } from "@chakra-ui/react"
import React from "react"

const Footer: React.FC = () => {
  return (
    <Box bg="gray.700" py={5} mb={0}>
      <Container maxW="container.xl" centerContent>
        <Text
          fontSize="lg"
          color="whiteAlpha.700"
          textAlign="center"
        >
          Dynamic Routine Maker, All rights reserved |
          Copyright &copy; 2022
        </Text>
      </Container>
    </Box>
  )
}

export default Footer
