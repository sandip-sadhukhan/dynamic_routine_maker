import {
  Container,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"
import Image from "next/image"
import React from "react"

const About: React.FC = () => {
  return (
    <Container
      maxW="container.xl"
      my={10}
      centerContent
      id="about-me"
    >
      <Heading as="h2" mb={10}>
        About
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <GridItem>
          <Flex justifyContent="center">
            <Image
              src="/sandip-sadhukhan.webp"
              alt="Hero Image"
              height="200px"
              width="200px"
              style={{ borderRadius: "50%" }}
            />
          </Flex>
        </GridItem>
        <GridItem>
          <Text textAlign="justify" fontSize="lg">
            I'm a full stack web developer. I am passionate
            about learning new things and creating projects.
            I completed my btech in Computer science and
            engineering from Bengal college of engineering
            and technology, durgapur with 9.28 GPA. My key
            skills are Html, CSS, JavaScript, Typescript,
            Bootstrap, React, Next Js, Chakra UI, Django,
            Django Rest Framework, SQLite, PostgreSQL and
            Python. I Developed many websites and software.
            Check out my GitHub account.
            github.com/sandippakhanna . Want to contact me?
            drop a message or mail me at
            sandip.sendme@gmail.com.
          </Text>
        </GridItem>
      </SimpleGrid>
    </Container>
  )
}

export default About
