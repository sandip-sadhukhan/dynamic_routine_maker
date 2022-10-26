import { AddIcon } from "@chakra-ui/icons"
import {
  Box,
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
  Input,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Navbar from "../../components/dashboard/navbar"
import RoutineBox from "../../components/dashboard/routine-box"
import LoadingSpinner from "../../components/loading-spinner"
import useCreateRoutine from "../../hooks/useCreateRoutine"
import useGetAllRoutines, {
  IRoutine,
} from "../../hooks/useGetAllRoutines"

const HomeDashboard: NextPage = () => {
  const [routines, setRoutine] = useState<IRoutine[]>([])
  const [createRoutine, { loading: createRoutineLoading }] =
    useCreateRoutine()
  const { data, loading, refetch } = useGetAllRoutines()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  interface IFormData {
    name: string
  }

  const { register, handleSubmit, setValue } =
    useForm<IFormData>()

  useEffect(() => {
    if (!data) return

    setRoutine(data.routines)
  }, [data])

  const onSubmit = async (data: IFormData) => {
    try {
      await createRoutine({
        variables: { name: data.name },
      })

      toast({
        title: "Routine is Created!",
        status: "success",
        isClosable: true,
      })

      const refetchRes = await refetch()
      setRoutine(refetchRes.data.routines)

      setValue("name", "")
      onClose()
    } catch {}
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <>
      <Navbar />
      <Container maxW="container.xl" centerContent>
        {routines.length > 0 ? (
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
                leftIcon={<AddIcon />}
                onClick={onOpen}
              >
                Create New Routine
              </Button>
            </HStack>
            <Divider
              bg="gray.300"
              borderWidth="1.2px"
              borderColor="gray.300"
            />
            <VStack w="full" pt={4} spacing={5}>
              {routines.map((routine) => (
                <RoutineBox key={routine.id} {...routine} />
              ))}
            </VStack>
          </VStack>
        ) : (
          <Center my={40} flexDirection="column">
            <Button
              variant="solid"
              colorScheme="messenger"
              leftIcon={<AddIcon />}
              onClick={onOpen}
            >
              Create Your First Routine
            </Button>
            <Text color="gray.500" mt={3}>
              Click the button above to create a new routine
            </Text>
          </Center>
        )}
      </Container>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
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
              Create a new routine
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
                isLoading={createRoutineLoading}
                loadingText="Creating..."
                type="submit"
              >
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </DrawerFooter>
          </Flex>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default HomeDashboard
