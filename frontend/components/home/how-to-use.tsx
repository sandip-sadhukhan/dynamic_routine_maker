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
          <HowToUseBox
            title="SignUp"
            body="Its take less than a minute to signup to our portal. Signup by clicking the above buttons."
            image="/signup.svg"
          />
        </GridItem>
        <GridItem>
          <HowToUseBox
            title="Create Routine"
            body="You can easily create your routine, and add classes by your dedicated easy to use dashboard."
            image="/add-routine.svg"
          />
        </GridItem>
        <GridItem>
          <HowToUseBox
            title="Publish to the internet"
            body="You will get your public routine link, which you can share with your students or classmates."
            image="/share.svg"
          />
        </GridItem>
      </SimpleGrid>
    </Container>
  )
}

export default HowToUse
