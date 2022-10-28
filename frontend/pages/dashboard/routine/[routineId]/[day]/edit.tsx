import {
  AddIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import Navbar from "../../../../../components/dashboard/navbar"
import LoadingSpinner from "../../../../../components/loading-spinner"
import useGetClasses, {
  IRoutine,
} from "../../../../../hooks/useGetClasses"
import timeFormatter from "../../../../../helpers/timeFormatter"

const EditPage: NextPage = () => {
  const router = useRouter()
  const routineId = router.query.routineId as string
  const currentDay = router.query.day as string

  const { data, loading } = useGetClasses(routineId)
  const [routine, setRoutine] = useState<IRoutine>()

  useEffect(() => {
    if (!data) return

    setRoutine(data.routineById)
  }, [data, loading])

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Navbar />
      <Container maxW="container.md" centerContent>
        <VStack align="start" w="full" my={8}>
          <Breadcrumb
            spacing={1}
            separator={<ChevronRightIcon />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/dashboard">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem cursor="pointer">
              <BreadcrumbLink
                as={Link}
                href={`/dashboard/routine/${routineId}`}
              >
                <Text>{routine?.name}</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem cursor="pointer">
              <BreadcrumbLink
                as={Link}
                href={`/dashboard/routine/${routineId}/${currentDay}/edit`}
              >
                <Text>{currentDay}</Text>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <HStack
            w="full"
            spacing={0}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack>
              <Heading as="h2" fontSize="3xl">
                Sunday - {routine?.name}
              </Heading>
            </HStack>
            <Link href={`/r/${routine?.slug}`} passHref>
              <a target="_blank">
                <Tooltip label="Open public routine link">
                  <IconButton
                    icon={
                      <ExternalLinkIcon fontSize="lg" />
                    }
                    variant="link"
                    colorScheme="messenger"
                    aria-label="Open link"
                  />
                </Tooltip>
              </a>
            </Link>
          </HStack>
          <Divider
            bg="gray.300"
            borderWidth="1.2px"
            borderColor="gray.300"
          />
          <TableContainer w="full" mt={10}>
            <Table
              variant="striped"
              size={{ base: "sm", md: "md" }}
            >
              <Thead>
                <Tr>
                  <Th>Class Name</Th>
                  <Th>Teacher</Th>
                  <Th>Timing</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {routine &&
                  routine.sundayClasses &&
                  routine.sundayClasses.map((classObj) => (
                    <Tr key={classObj.id}>
                      <Td>{classObj.subject}</Td>
                      <Td>{classObj.teacherShortName}</Td>
                      <Td>
                        {timeFormatter(classObj.startTime)}{" "}
                        - {timeFormatter(classObj.endTime)}
                      </Td>
                      <Td>
                        <HStack>
                          <Button
                            size="sm"
                            colorScheme="messenger"
                            variant="outline"
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            colorScheme="red"
                            variant="outline"
                          >
                            Delete
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Center py={8} w="full">
            <Button
              leftIcon={<AddIcon />}
              colorScheme="whatsapp"
            >
              Add New Schedule
            </Button>
          </Center>
        </VStack>
      </Container>
    </>
  )
}

export default EditPage
