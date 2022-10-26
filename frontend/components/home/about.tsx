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
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={10}>
        <GridItem>
          <Flex justifyContent="end">
            <Image
              src="/hero-image.svg"
              alt="Hero Image"
              height="300px"
              width="400px"
            />
          </Flex>
        </GridItem>
        <GridItem>
          <Text textAlign="justify" color="gray.500">
            Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Molestias fuga rem cupiditate
            facere obcaecati quos fugit odio ullam, culpa
            veritatis maiores mollitia est quasi laudantium
            doloremque debitis, quibusdam, blanditiis
            similique accusantium. Dolor tenetur autem iste
            sit sint maiores, blanditiis magnam sapiente?
            Voluptas alias dolores et excepturi nostrum
            officiis ex dolorem eos aspernatur nulla
            nesciunt minus asperiores quasi tempora,
            pariatur accusantium neque ab doloremque, fugit
            error fugiat exercitationem numquam. Accusantium
            aperiam consequatur veniam debitis itaque, fugit
            incidunt fugiat eos nemo eligendi alias aliquam?
            Iste fugit atque perferendis. Voluptate
            repellendus commodi dolorum ex nam, obcaecati
            dolorem aspernatur. Incidunt veniam eum dolor
            cumque?
          </Text>
        </GridItem>
      </SimpleGrid>
    </Container>
  )
}

export default About
