import {
  AddIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons"
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Center,
  Container,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
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
import { useForm } from "react-hook-form"
import useCreateClass from "../../../../../hooks/useCreateClass"

const EditPage: NextPage = () => {
  const router = useRouter()
  const routineId = router.query.routineId as string
  const currentDay = router.query.day as string

  const { data, loading, refetch } = useGetClasses(
    routineId,
    currentDay
  )
  const [routine, setRoutine] = useState<IRoutine>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [createClass, { loading: createClassLoading }] =
    useCreateClass()

  interface ScheduleForm {
    subject: string
    teacherShortName: string
    startTime: string
    endTime: string
  }

  const { register, handleSubmit, setValue } =
    useForm<ScheduleForm>()

  const onSubmit = async (data: ScheduleForm) => {
    await createClass({
      variables: { day: currentDay, routineId, ...data },
    })
    await refetch()
    onClose()

    setValue("subject", "")
    setValue("teacherShortName", "")
    setValue("startTime", "")
    setValue("endTime", "")
  }

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
                {currentDay} - {routine?.name}
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
          {routine?.classes.length && (
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
                    routine.classes.map((classObj) => (
                      <Tr key={classObj.id}>
                        <Td>{classObj.subject}</Td>
                        <Td>{classObj.teacherShortName}</Td>
                        <Td>
                          {timeFormatter(
                            classObj.startTime
                          )}{" "}
                          -{" "}
                          {timeFormatter(classObj.endTime)}
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
          )}

          <Center py={8} w="full">
            <Button
              leftIcon={<AddIcon />}
              colorScheme="whatsapp"
              onClick={onOpen}
            >
              Add New Schedule
            </Button>
          </Center>
        </VStack>
      </Container>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        returnFocusOnClose={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <Flex
            h="full"
            flexDir="column"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Change routine name
            </DrawerHeader>

            <DrawerBody>
              <VStack spacing={4} w="100%">
                <Box w="full">
                  <FormLabel htmlFor="name">
                    Subject
                  </FormLabel>
                  <Input
                    placeholder="eg: Biology"
                    {...register("subject")}
                    required
                  />
                </Box>
                <Box w="full">
                  <FormLabel htmlFor="name">
                    Teacher Short Name
                  </FormLabel>
                  <Input
                    placeholder="eg: PG"
                    {...register("teacherShortName")}
                    required
                  />
                </Box>
                <Box w="full">
                  <FormLabel htmlFor="name">
                    Start Time
                  </FormLabel>
                  <Input
                    type="time"
                    {...register("startTime")}
                    required
                  />
                </Box>
                <Box w="full">
                  <FormLabel htmlFor="name">
                    End Time
                  </FormLabel>
                  <Input
                    type="time"
                    {...register("endTime")}
                    required
                  />
                </Box>
              </VStack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button
                variant="outline"
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={createClassLoading}
                loadingText="Creating..."
              >
                Submit
              </Button>
            </DrawerFooter>
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default EditPage
