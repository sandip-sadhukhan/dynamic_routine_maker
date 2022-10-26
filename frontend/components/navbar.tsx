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

const Navbar = () => {
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
          <HStack>
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
              Dynamic Routine Maker
            </Heading>
          </HStack>
          <HStack
            spacing={6}
            display={{ base: "none", md: "flex" }}
          >
            <Button variant="link">
              <Link href="/#home" passHref>
                Home
              </Link>
            </Button>
            <Button variant="link">
              <Link href="/#how-it-works" passHref>
                How it works
              </Link>
            </Button>
            <Button variant="link">
              <Link href="/#about-me" passHref>
                About me
              </Link>
            </Button>
            <Button colorScheme="messenger" size="sm">
              Login
            </Button>
            <Button
              colorScheme="messenger"
              variant="outline"
              size="sm"
            >
              SignUp
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
                <Link href="/#how-it-works" passHref>
                  <MenuItem>How it works</MenuItem>
                </Link>
                <Link href="/#about-me" passHref>
                  <MenuItem>About me</MenuItem>
                </Link>
                <MenuItem>
                  <Button
                    colorScheme="messenger"
                    size="sm"
                    w="full"
                  >
                    Login
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    colorScheme="messenger"
                    variant="outline"
                    size="sm"
                    w="full"
                  >
                    SignUp
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
