import {
  ChevronRightIcon,
  ExternalLinkIcon,
  SettingsIcon,
} from "@chakra-ui/icons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  VStack,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Navbar from "../../../components/dashboard/navbar"
import LoadingSpinner from "../../../components/loading-spinner"
import useGetRoutine, {
  IRoutine,
} from "../../../hooks/useGetRoutine"

const RoutinePage: NextPage = () => {
  const router = useRouter()
  const routineId = router.query.routineId as string
  const { data, loading } = useGetRoutine(routineId)
  const [routine, setRoutine] = useState<IRoutine>()

  useEffect(() => {
    if (!data) return

    console.log(data)

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

            <BreadcrumbItem>
              <BreadcrumbLink
                as={Link}
                href={`/dashboard/routine/${routineId}`}
              >
                <>{routine?.name}</>
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
                {routine?.name}
              </Heading>
              <Tooltip label="Change routine name">
                <IconButton
                  icon={<SettingsIcon fontSize="lg" />}
                  variant="link"
                  colorScheme="whatsapp"
                  aria-label="Change Name"
                />
              </Tooltip>
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
          <TableContainer w="full">
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Day</Th>
                  <Th>No of Classes</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {routine &&
                  Object.keys(routine.getClassesCount).map(
                    (day) => {
                      if (day === "__typename") return

                      return (
                        <Tr key={day}>
                          <Td>{day.toUpperCase()}</Td>
                          <Td>
                            {
                              (
                                routine.getClassesCount as any
                              )[day]
                            }
                          </Td>
                          <Td>
                            <HStack>
                              <Button
                                size="sm"
                                colorScheme="whatsapp"
                                variant="outline"
                              >
                                View
                              </Button>
                              <Button
                                size="sm"
                                colorScheme="messenger"
                                variant="outline"
                              >
                                Edit
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      )
                    }
                  )}
              </Tbody>
            </Table>
          </TableContainer>
        </VStack>
      </Container>
    </>
  )
}

export default RoutinePage
