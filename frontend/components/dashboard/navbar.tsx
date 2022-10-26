import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import Image from "next/image"
import Link from "next/link"
import { HamburgerIcon } from "@chakra-ui/icons"

const Navbar: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const navbarBg = useColorModeValue("gray.50", "gray.700")

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
          <HStack
            spacing={6}
            display={{ base: "none", md: "flex" }}
          >
            <Button variant="link">
              <Link href="/" passHref>
                Home
              </Link>
            </Button>
            <Button variant="link">
              <Link href="/dashboard" passHref>
                Dashboard
              </Link>
            </Button>

            <Button colorScheme="gray" size="sm">
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
          <HStack display={{ base: "flex", md: "none" }}>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
              />
              <MenuList>
                <Link href="/" passHref>
                  <MenuItem>Home</MenuItem>
                </Link>
                <Link href="/dashboard" passHref>
                  <MenuItem>Dashboard</MenuItem>
                </Link>
                <MenuItem>
                  <Button
                    colorScheme="gray"
                    size="sm"
                    w="full"
                  >
                    Logout
                  </Button>
                </MenuItem>
                <MenuItem justifyContent="center">
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
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Container>
    </Box>
  )
}

export default Navbar
