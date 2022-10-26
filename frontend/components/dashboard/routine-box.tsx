import {
  ArrowForwardIcon,
  DeleteIcon,
  EditIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons"
import {
  Button,
  HStack,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

const RoutineBox: React.FC = () => {
  const bgColor = useColorModeValue(
    "blackAlpha.50",
    "whiteAlpha.50"
  )
  const bgHoverColor = useColorModeValue(
    "blackAlpha.200",
    "whiteAlpha.200"
  )

  const router = useRouter()

  const openEditLink = () => {
    router.push("/routine/11132")
  }

  return (
    <HStack
      align="start"
      w="full"
      bg={bgColor}
      alignItems="center"
      borderRadius="md"
      cursor="pointer"
      _hover={{
        bg: bgHoverColor,
        shadow: "base",
      }}
      px={10}
      py={3}
      onClick={openEditLink}
    >
      <HStack
        justifyContent="space-between"
        w="full"
        flexDir={{ base: "column", md: "row" }}
        gap={4}
      >
        <HStack>
          <ArrowForwardIcon fontSize={20} />
          <Text fontWeight="bold">
            Class 1 Section B Routine
          </Text>
        </HStack>
        <HStack>
          <Link href="/routine/1222" passHref>
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
          <Link href="/routine/1223" passHref>
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
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </HStack>
      </HStack>
    </HStack>
  )
}

export default RoutineBox
