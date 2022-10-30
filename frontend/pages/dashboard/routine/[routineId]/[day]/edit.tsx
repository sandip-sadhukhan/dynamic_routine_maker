import {
  AddIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import React, { useEffect, useState } from "react"

import Navbar from "../../../../../components/dashboard/navbar"
import LoadingSpinner from "../../../../../components/loading-spinner"
import useGetClasses, {
  IRoutine,
} from "../../../../../hooks/useGetClasses"
import timeFormatter from "../../../../../helpers/timeFormatter"
import { useForm } from "react-hook-form"
import useCreateClass from "../../../../../hooks/useCreateClass"
import { capitalize } from "../../../../../helpers/utils"
import useClassDelete from "../../../../../hooks/useClassDelete"
import useUpdateClass from "../../../../../hooks/useUpdateClass"

const EditPage: NextPage = () => {
  const router = useRouter()
  const routineId = router.query.routineId as string
  const currentDay = router.query.day as string
  const cancelRef = React.useRef()

  const { data, loading, refetch } = useGetClasses(
    routineId,
    currentDay
  )
  const [routine, setRoutine] = useState<IRoutine>()
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure()

  const [selectDeleteId, setSelectDeleteId] = useState<
    string | null
  >(null)

  const [selectEditId, setSelectEditId] = useState<
    string | null
  >(null)

  const {
    isOpen: isOpenDialog,
    onOpen: onOpenDialog,
    onClose: onCloseDialog,
  } = useDisclosure()

  const [createClass, { loading: createClassLoading }] =
    useCreateClass()

  const [updateClass, { loading: updateClassLoading }] =
    useUpdateClass()

  interface ScheduleForm {
    subject: string
    teacherShortName: string
    startTime: string
    endTime: string
  }

  const { register, handleSubmit, setValue } =
    useForm<ScheduleForm>()

  const onSubmit = async (data: ScheduleForm) => {
    if (selectEditId) {
      try {
        await updateClass({
          variables: {
            id: selectEditId,
            routineId,
            ...data,
          },
        })

        await refetch()
        onCloseDrawer()

        setValue("subject", "")
        setValue("teacherShortName", "")
        setValue("startTime", "")
        setValue("endTime", "")
        setSelectEditId(null)
      } catch {}
    } else {
      try {
        await createClass({
          variables: {
            day: currentDay,
            routineId,
            ...data,
          },
        })
        await refetch()
        onCloseDrawer()

        setValue("subject", "")
        setValue("teacherShortName", "")
        setValue("startTime", "")
        setValue("endTime", "")
      } catch {}
    }
  }

  const [classDelete, { loading: classDeleteLoading }] =
    useClassDelete()

  useEffect(() => {
    if (!data) return

    setRoutine(data.routineById)
  }, [data, loading])

  if (loading) {
    return <LoadingSpinner />
  }

  const selectDelete = (id: string) => {
    setSelectDeleteId(id)
    onOpenDialog()
  }

  const onDelete = async () => {
    if (!selectDeleteId) return

    try {
      await classDelete({
        variables: { id: selectDeleteId, routineId },
      })

      setSelectDeleteId(null)

      onCloseDialog()
      refetch()
    } catch {}
  }

  const selectEdit = (id: string) => {
    setSelectEditId(id)

    const classObj = routine?.classes.find(
      (classObj) => classObj.id === id
    )

    if (!classObj) return

    setValue("subject", classObj.subject)
    setValue("teacherShortName", classObj.teacherShortName)
    setValue("startTime", classObj.startTime)
    setValue("endTime", classObj.endTime)

    onOpenDrawer()
  }

  const openCreateClassDialog = () => {
    onOpenDrawer()
    setSelectEditId(null)

    setValue("subject", "")
    setValue("teacherShortName", "")
    setValue("startTime", "")
    setValue("endTime", "")
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
                <Text>{capitalize(currentDay)}</Text>
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
                {capitalize(currentDay)} - {routine?.name}
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
                              onClick={() =>
                                selectEdit(classObj.id)
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              colorScheme="red"
                              variant="outline"
                              onClick={() =>
                                selectDelete(classObj.id)
                              }
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
              size="sm"
              onClick={openCreateClassDialog}
            >
              Add New Schedule
            </Button>
          </Center>
        </VStack>
      </Container>

      <Drawer
        isOpen={isOpenDrawer}
        placement="right"
        onClose={onCloseDrawer}
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
                onClick={onCloseDrawer}
              >
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={
                  createClassLoading || updateClassLoading
                }
                loadingText={
                  selectEditId ? "Updating" : "Creating"
                }
              >
                Submit
              </Button>
            </DrawerFooter>
          </Flex>
        </DrawerContent>
      </Drawer>

      <AlertDialog
        isOpen={isOpenDialog}
        onClose={onCloseDialog}
        leastDestructiveRef={
          cancelRef as any as React.RefObject<HTMLButtonElement>
        }
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
            >
              Delete Class
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action
              afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                onClick={onCloseDialog}
                ref={
                  cancelRef as any as React.RefObject<HTMLButtonElement>
                }
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={onDelete}
                ml={3}
                isLoading={classDeleteLoading}
                loadingText="Delete"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default EditPage
