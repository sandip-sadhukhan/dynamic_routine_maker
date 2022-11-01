import {
  Button,
  Container,
  Flex,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"
import Image from "next/image"
import React from "react"

interface HeroSectionProps {
  loginOnOpen: () => void
  signUpOnOpen: () => void
}

const HeroSection: React.FC<HeroSectionProps> = (
  props: HeroSectionProps
) => {
  const { loginOnOpen, signUpOnOpen } = props

  return (
    <Container maxW="container.xl" centerContent id="home">
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        w="full"
        alignItems="center"
        minHeight="60vh"
        py={5}
      >
        <GridItem>
          <Heading
            as="h1"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="5xl"
            fontWeight="extrabold"
          >
            Make your Digital Routine
          </Heading>
          <Text
            mt={3}
            textAlign="justify"
            fontSize="xl"
            color="gray.500"
          >
            In this website, you will get fully fletch
            dashboard to create your digital routine. Create
            your routine, add your classes, and yaah, you
            got your public routine url, which you can share
            with your classmates, students or for yourself.
          </Text>
          <HStack mt={6} spacing={4}>
            <Button
              colorScheme="messenger"
              px={10}
              onClick={loginOnOpen}
            >
              Login
            </Button>
            <Button
              colorScheme="messenger"
              variant="outline"
              px={10}
              onClick={signUpOnOpen}
            >
              SignUp
            </Button>
          </HStack>
        </GridItem>
        <GridItem>
          <Flex justifyContent="center">
            <Image
              width="400px"
              height="400px"
              src="/hero-image.svg"
              alt="hero-section-image"
              style={{ borderRadius: "5px" }}
            />
          </Flex>
        </GridItem>
      </SimpleGrid>
    </Container>
  )
}

export default HeroSection
