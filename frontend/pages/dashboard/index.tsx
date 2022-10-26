import { AddIcon } from "@chakra-ui/icons"
import {
  Button,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Navbar from "../../components/dashboard/navbar"
import RoutineBox from "../../components/dashboard/routine-box"

const HomeDashboard: NextPage = () => {
  const routineCount = 1
  return (
    <>
      <Navbar />
      <Container maxW="container.xl" centerContent>
        {routineCount > 0 ? (
          <VStack align="start" w="full" my={10}>
            <HStack
              justifyContent="space-between"
              w="full"
              flexDir={{ base: "column", md: "row" }}
              gap={4}
            >
              <Heading as="h2" fontSize="3xl">
                Your Routines
              </Heading>
              <Button
                variant="solid"
                size="sm"
                colorScheme="messenger"
              >
                <AddIcon me={2} /> Create New Routine
              </Button>
            </HStack>
            <Divider
              bg="gray.300"
              borderWidth="1.2px"
              borderColor="gray.300"
            />
            <VStack w="full" pt={4} spacing={5}>
              {[1, 2, 3].map((ele) => (
                <RoutineBox key={ele} />
              ))}
            </VStack>
          </VStack>
        ) : (
          <Center my={40} flexDirection="column">
            <Button variant="solid" colorScheme="messenger">
              <AddIcon me={2} /> Create Your First Routine
            </Button>
            <Text color="gray.500" mt={3}>
              Click the button above to create a new routine
            </Text>
          </Center>
        )}
      </Container>
    </>
  )
}

export default HomeDashboard
