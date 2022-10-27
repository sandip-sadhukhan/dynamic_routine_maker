import {
  ApolloQueryResult,
  OperationVariables,
} from "@apollo/client"
import {
  ArrowForwardIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons"
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import Link from "next/link"
import React, { LegacyRef, RefObject } from "react"
import {
  IRoutine,
  IRoutineWrapper,
} from "../../hooks/useGetAllRoutines"
import useRoutineDelete from "../../hooks/useRoutineDelete"

interface RoutineBoxProps {
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<IRoutineWrapper>>
}

const RoutineBox: React.FC<IRoutine & RoutineBoxProps> = ({
  id,
  name,
  slug,
  refetch,
}) => {
  const bgColor = useColorModeValue(
    "blackAlpha.50",
    "whiteAlpha.50"
  )
  const bgHoverColor = useColorModeValue(
    "blackAlpha.200",
    "whiteAlpha.200"
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [routineDelete, { loading }] = useRoutineDelete()
  const toast = useToast()

  const deleteRoutine = async () => {
    try {
      const data = await routineDelete({
        variables: { id },
      })
      if (data.data?.deleteRoutine.success) {
        toast({
          title: "Routine Deleted!",
          status: "success",
          isClosable: true,
        })
      } else {
        toast({
          title: "Something went wrong",
          status: "error",
          isClosable: true,
        })
      }
      onClose()
      refetch()
    } catch {}
  }

  return (
    <>
      <HStack
        align="start"
        w="full"
        bg={bgColor}
        alignItems="center"
        borderRadius="md"
        _hover={{
          bg: bgHoverColor,
          shadow: "base",
        }}
        px={10}
        py={3}
      >
        <HStack
          justifyContent="space-between"
          w="full"
          flexDir={{ base: "column", md: "row" }}
          gap={4}
        >
          <HStack>
            <ArrowForwardIcon fontSize={20} />
            <Link
              href={`/dashboard/routine/${id}`}
              passHref
            >
              <a>
                <Text fontWeight="bold">{name}</Text>
              </a>
            </Link>
          </HStack>
          <HStack>
            <Link href={`/r/${slug}`} passHref>
              <a target="_blank" rel="noopener noreferrer">
                <Tooltip label="Open your public routine link">
                  <Button
                    variant="solid"
                    size="sm"
                    colorScheme="whatsapp"
                  >
                    <ExternalLinkIcon />
                  </Button>
                </Tooltip>
              </a>
            </Link>
            <Link
              href={`/dashboard/routine/${id}`}
              passHref
            >
              <a>
                <Tooltip label="Edit your routine">
                  <Button
                    variant="solid"
                    size="sm"
                    colorScheme="messenger"
                  >
                    <EditIcon />
                  </Button>
                </Tooltip>
              </a>
            </Link>
            <Tooltip label="Delete your routine">
              <Button
                variant="solid"
                size="sm"
                colorScheme="red"
                onClick={onOpen}
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </HStack>
        </HStack>
      </HStack>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={
          cancelRef as any as RefObject<HTMLButtonElement>
        }
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
            >
              Delete Routine
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action
              afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={
                  cancelRef as any as LegacyRef<HTMLButtonElement>
                }
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={deleteRoutine}
                ml={3}
                isLoading={loading}
                loadingText="Deleting"
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

export default RoutineBox
