import {
  Container,
  GridItem,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react"
import React from "react"
import HowToUseBox from "./how-to-use-box"

const HowToUse: React.FC = () => {
  return (
    <Container
      maxW="container.xl"
      my={10}
      centerContent
      id="how-it-works"
    >
      <Heading as="h2" mb={10}>
        How To Use
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
        <GridItem>
          <HowToUseBox />
        </GridItem>
        <GridItem>
          <HowToUseBox />
        </GridItem>
        <GridItem>
          <HowToUseBox />
        </GridItem>
      </SimpleGrid>
    </Container>
  )
}

export default HowToUse
