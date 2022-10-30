import {
  ChevronRightIcon,
  ExternalLinkIcon,
  SettingsIcon,
} from "@chakra-ui/icons"
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
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
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Navbar from "../../../../components/dashboard/navbar"
import LoadingSpinner from "../../../../components/loading-spinner"
import { capitalize } from "../../../../helpers/utils"
import useGetRoutine, {
  IRoutine,
} from "../../../../hooks/useGetRoutine"
import useUpdateRoutine from "../../../../hooks/useUpdateRoutine"

const RoutinePage: NextPage = () => {
  const router = useRouter()
  const routineId = router.query.routineId as string
  const { data, loading } = useGetRoutine(routineId)
  const [routine, setRoutine] = useState<IRoutine>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [updateRoutine, { loading: updateRoutineLoading }] =
    useUpdateRoutine()
  const toast = useToast()

  const { register, handleSubmit, setValue } =
    useForm<IFormData>()

  useEffect(() => {
    if (!data) return

    setRoutine(data.routineById)
    setValue("name", data.routineById.name || "")
  }, [data, loading, setValue])

  interface IFormData {
    name: string
  }

  const onSubmit = async (data: IFormData) => {
    try {
      const routine = await updateRoutine({
        variables: { id: routineId, name: data.name },
      })

      // const refetchRes = await refetch()
      setRoutine(routine.data?.updateRoutine.routine)

      setValue(
        "name",
        routine.data?.updateRoutine.routine.name || ""
      )
      onClose()

      toast({
        title: "Routine Updated!",
        status: "success",
        isClosable: true,
      })
    } catch {}
  }

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
                  onClick={onOpen}
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
            <Table
              variant="striped"
              size={{ base: "sm", md: "md" }}
            >
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
                          <Td>{capitalize(day)}</Td>
                          <Td>
                            {
                              (
                                routine.getClassesCount as any
                              )[day]
                            }
                          </Td>
                          <Td>
                            <Link
                              href={`/dashboard/routine/${routineId}/${day}/edit`}
                            >
                              <Button
                                size="sm"
                                colorScheme="messenger"
                                variant="outline"
                              >
                                View / Edit
                              </Button>
                            </Link>
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
              <Box>
                <FormLabel htmlFor="name">
                  Routine Name
                </FormLabel>
                <Input
                  id="name"
                  placeholder="Please enter routine name"
                  {...register("name")}
                  minLength={4}
                  required
                />
              </Box>
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
                isLoading={updateRoutineLoading}
                loadingText="Updating..."
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

export default RoutinePage
