import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const navbarBg = useColorModeValue("gray.50", "gray.700")
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <Box
      as="nav"
      w="full"
      boxShadow="base"
      py={2}
      bg={navbarBg}
    >
      <Container maxW="container.xl" centerContent>
        <HStack w="full" justifyContent="space-between">
          <Link href="/dashboard" passHref>
            <HStack cursor="pointer">
              <Image
                width={30}
                height={30}
                src="/favicon.png"
                alt="Logo"
              />
              <Heading
                as="h3"
                size="md"
                colorScheme="messenger"
                fontSize={{ base: "md", md: "lg" }}
              >
                Dashboard
              </Heading>
            </HStack>
          </Link>
          <HStack spacing={6}>
            <Button
              colorScheme="gray"
              size="sm"
              onClick={logout}
            >
              Logout
            </Button>

            <IconButton
              variant="ghost"
              icon={
                colorMode === "light" ? (
                  <MoonIcon />
                ) : (
                  <SunIcon />
                )
              }
              aria-label="Theme Toggle"
              onClick={toggleColorMode}
            />
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

export default Navbar
